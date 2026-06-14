import { PrismaService } from '../../prisma/prisma.service';
import { Status } from '@prisma/client';

export abstract class BaseDeliveryService {
  constructor(
    protected readonly prisma: PrismaService,
  ) { }

  protected async startDelivery(
    deliveryId: string,
  ) {
    const delivery =
      await this.prisma.delivery.findUnique({
        where: {
          id: deliveryId,
        },
      });

    if (!delivery) {
      throw new Error('Delivery not found');
    }

    if (delivery.status === Status.SENT) {
      return null;
    }

    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.PROCESSING,
      },
    });

    return delivery;
  }

  protected async markSent(
    deliveryId: string,
  ) {
    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.SENT,
        sentAt: new Date(),
        errorDetails: null,
        errorCode: null,
      },
    });
  }
}