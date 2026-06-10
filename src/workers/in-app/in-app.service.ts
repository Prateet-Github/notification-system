import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { InAppProvider } from '@/providers/in-app/in-app.provider';
import { BaseDeliveryService } from '../base/base-delivery.worker';

@Injectable()
export class InAppService extends BaseDeliveryService {
  constructor(
    prisma: PrismaService,

    @Inject(InAppProvider)
    private readonly inAppProvider: InAppProvider,
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

    await this.inAppProvider.send(
      'test@example.com',
      'Order Placed In-App Message',
      'Your order has been placed.',
    );

    await this.markSent(deliveryId);
  }
}