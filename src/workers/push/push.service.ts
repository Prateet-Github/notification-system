import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { PushProvider } from '@/providers/push/push.provider';
import { BaseDeliveryService } from '../base/base-delivery.service';

@Injectable()
export class PushService extends BaseDeliveryService {
  constructor(
    prisma: PrismaService,

    @Inject(PushProvider)
    private readonly pushProvider: PushProvider,
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

    const result = await this.pushProvider.send(
      'test@example.com',
      'Order Placed Push',
      'Your order has been placed.',
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