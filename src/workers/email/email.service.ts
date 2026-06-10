import { Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async processDelivery(deliveryId: string) {
    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.SENT,
      },
    });

    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id: deliveryId,
      },
    });

    console.log('Email delivery processed:', delivery);
  }
}