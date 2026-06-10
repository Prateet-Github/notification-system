import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PRIORITIES } from './constants';
import { QUEUES } from './constants';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
export class QueueRouterService {
  constructor(

    private readonly prisma: PrismaService,

    @InjectQueue(QUEUES.EMAIL)
    private readonly emailQueue: Queue,

    @InjectQueue(QUEUES.SMS)
    private readonly smsQueue: Queue,

    @InjectQueue(QUEUES.PUSH)
    private readonly pushQueue: Queue,

    @InjectQueue(QUEUES.IN_APP)
    private readonly inAppQueue: Queue,
  ) { }

  async route(
    deliveryId: string,
    channel: string,
    priority: string,
  ) {
    const queuePriority =
      PRIORITIES[priority as keyof typeof PRIORITIES] ??
      PRIORITIES.LOW;

    await this.prisma.delivery.update({
      where: {
        id: deliveryId,
      },
      data: {
        status: Status.QUEUED,
      },
    });

    const jobOptions = {
      priority: queuePriority,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    };

    switch (channel) {
      case 'EMAIL':
        await this.emailQueue.add(
          'process-delivery',
          { deliveryId },
          jobOptions,
        );
        break;

      case 'SMS':
        await this.smsQueue.add(
          'process-delivery',
          { deliveryId },
          jobOptions,
        );
        break;

      case 'PUSH':
        await this.pushQueue.add(
          'process-delivery',
          { deliveryId },
          jobOptions,
        );
        break;

      case 'IN_APP':
        await this.inAppQueue.add(
          'process-delivery',
          { deliveryId },
          jobOptions,
        );
        break;

      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }
  }
}