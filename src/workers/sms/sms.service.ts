import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SmsProvider } from '@/providers/sms/sms.provider';
import { BaseDeliveryService } from '../base/base-delivery.worker';

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

    await this.smsProvider.send(
      '+1234567890',
      'Order Placed SMS',
      'Your order has been placed.',
    );

    await this.markSent(deliveryId);
  }
}