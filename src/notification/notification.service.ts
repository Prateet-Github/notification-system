import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Channel } from '@prisma/client';
import { QueueRouterService } from '../queue/queue-router.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private queueRouter: QueueRouterService,
  ) { }

  async create(dto: CreateNotificationDto) {
    const preference = await this.prisma.userPreference.findUnique({
      where: {
        userId: dto.userId,
      },
      include: {
        channels: true,
      },
    });

    const enabledChannels = preference
      ? preference.channels
        .filter((channel) => channel.isEnabled)
        .map((channel) => ({
          channel: channel.channel,
        }))
      : [
        { channel: Channel.EMAIL },
        { channel: Channel.PUSH },
        { channel: Channel.IN_APP },
      ];

    const notification = await this.prisma.notification.create({
      data: {
        userId: dto.userId,
        eventType: dto.eventType,
        priority: dto.priority,
        payload: dto.payload,

        deliveries: {
          create: enabledChannels,
        },
      },

      include: {
        deliveries: true,
      },
    });

    for (const delivery of notification.deliveries) {
      await this.queueRouter.route( // push to queue based on channel and priority as thin job with deliveryId
        delivery.id,
        delivery.channel,
        notification.priority,
      );
    }

    return notification;
  }

  async findAll() {
    return this.prisma.notification.findMany({
      include: {
        deliveries: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.notification.findUnique({
      where: { id },
      include: {
        deliveries: true,
      },
    });
  }

}