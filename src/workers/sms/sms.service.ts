import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SmsProvider } from '@/providers/sms/sms.provider';
import { BaseDeliveryService } from '../base/base-delivery.service';

@Injectable()
export class SmsService extends BaseDeliveryService {
  constructor(
    prisma: PrismaService,

    @Inject(SmsProvider)
    private readonly smsProvider: SmsProvider,
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

    const result = await this.smsProvider.send(
      '+1234567890',
      'Order Placed SMS',
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