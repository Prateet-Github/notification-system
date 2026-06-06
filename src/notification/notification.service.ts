import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Channel } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }

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

    return this.prisma.notification.create({
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