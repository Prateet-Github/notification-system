import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId: dto.userId,
        eventType: dto.eventType,
        priority: dto.priority,
        payload: dto.payload,
        deliveries: {
          create: [
            { channel: 'EMAIL' },
            { channel: 'SMS' },
            { channel: 'PUSH' },
            { channel: 'IN_APP' },
          ]
        }
      },
      include: {
        deliveries: {
          select: {
            id: true,
            channel: true,
            status: true,
          },
        },

      }
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