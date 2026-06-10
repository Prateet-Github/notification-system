import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { EmailProvider } from '@/providers/email/email.provider';
import { BaseDeliveryService } from '../base/base-delivery.worker';

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

    await this.emailProvider.send(
      'test@example.com',
      'Order Placed',
      'Your order has been placed.',
    );

    await this.markSent(deliveryId);
  }
}