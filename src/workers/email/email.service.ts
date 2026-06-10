import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async processDelivery(deliveryId: string) {
    // simulate provider call

    // throw new Error('Simulated email failure'); // test retry logic

    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.SENT,
      },
    });
  }
}