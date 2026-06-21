import { Inject, Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { PushProvider } from '@/providers/push/push.provider';
import { BaseDeliveryService } from '../base/base-delivery.service';
import { PushTokenService } from '@/push-token/push-token.service';

@Injectable()
export class PushService extends BaseDeliveryService {
  constructor(
    prisma: PrismaService,

    @Inject(PushProvider)
    private readonly pushProvider: PushProvider,

    private readonly pushTokenService: PushTokenService,
  ) {
    super(prisma);
  }

  async processDelivery(deliveryId: string) {
    const delivery = await this.startDelivery(
      deliveryId,
    );
    console.log(
      JSON.stringify(delivery, null, 2),
    );

    if (!delivery) {
      return;
    }

    const tokens =
      await this.pushTokenService.findByUserId(
        delivery.notification.userId,
      );

    const token =
      tokens[tokens.length - 1]?.token;

    if (!token) {
      throw new Error(
        `No push token found for user ${delivery.notification.userId}`,
      );
    }
    type NotificationPayload = {
      title: string;
      message: string;
    };

    const payload =
      delivery.notification.payload as NotificationPayload;

    const result =
      await this.pushProvider.send(
        token,
        payload.title,
        payload.message,
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