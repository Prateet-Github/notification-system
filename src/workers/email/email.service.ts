import { Inject, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailProvider } from '@/providers/email/email.provider';

@Injectable()
export class EmailService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(EmailProvider)
    private readonly emailProvider: EmailProvider,
  ) { }

  async processDelivery(deliveryId: string) {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id: deliveryId,
      },
    });

    if (!delivery) {
      throw new Error('Delivery not found');
    }

    if (delivery.status === Status.SENT) {
      return;
    }

    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.PROCESSING,
      },
    });

    await this.emailProvider.send(
      'test@example.com',
      'Order Placed',
      'Your order has been placed.',
    );

    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.SENT,
        sentAt: new Date(),
      },
    });
  }
}