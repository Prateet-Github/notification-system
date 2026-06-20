import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { EmailProvider } from '@/providers/email/email.provider';
import { BaseDeliveryService } from '../base/base-delivery.service';
import { orderPlacedTemplate } from '../../templates/email/order-placed.template';

@Injectable()
export class EmailService extends BaseDeliveryService {
  constructor(
    prisma: PrismaService,

    @Inject(EmailProvider)
    private readonly emailProvider: EmailProvider,
  ) {
    super(prisma);
  }

  async processDelivery(deliveryId: string) {
    const delivery = await this.startDelivery(
      deliveryId,
    );

    if (!delivery) {
      return;
    }

    const result = await this.emailProvider.send(
      'prateettiwari29@gmail.com',
      'Order Confirmed',
      orderPlacedTemplate('ORD-12345'),
    );

    await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        provider: result.provider,
        providerId: result.providerId,
      },
    });

    await this.markSent(deliveryId);
  }
}