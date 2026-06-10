import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async processDelivery(deliveryId: string) {
    try {
      // Simulate provider call

      throw new Error('Simulated email failure');

      await this.prisma.delivery.update({
        where: {
          id: deliveryId,
        },
        data: {
          status: Status.SENT,
        },
      });

      console.log(`Delivery ${deliveryId} sent`);
    } catch (error) {
      // console.error(`Delivery ${deliveryId} failed`, error);
      throw error;
    }
  }
}