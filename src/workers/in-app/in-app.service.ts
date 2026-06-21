import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { InAppProvider } from '@/providers/in-app/in-app.provider';
import { BaseDeliveryService } from '../base/base-delivery.service';
import { RedisPublisherService } from '@/redis/redis.publish.service';

@Injectable()
export class InAppService extends BaseDeliveryService {
  constructor(
    prisma: PrismaService,

    @Inject(InAppProvider)
    private readonly inAppProvider: InAppProvider,
    private readonly redisPublisherService: RedisPublisherService,
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

    const deliveryWithNotification = await this.prisma.delivery.findUnique({
      where: { id: deliveryId },
      include: { notification: true },
    });

    const result = await this.inAppProvider.send(
      'test@example.com',
      'Order Placed In-App Message',
      'Your order has been placed.',
    );

    await this.prisma.delivery.update({
      where: { id: deliveryId },
      data: {
        provider: result.provider,
        providerId: result.providerId,
      },
    });

    await this.redisPublisherService.publish(
      'notifications',
      {
        userId:
          deliveryWithNotification!.notification.userId,

        payload: {
          id: deliveryId,
          title: 'Order Placed',
          message: 'Your order has been placed.',
        },
      }
    );

    await this.markSent(deliveryId);
  }
}