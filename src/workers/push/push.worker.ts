import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
} from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { QUEUES } from '../../queue/constants';
import { PushService } from './push.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
@Processor(QUEUES.PUSH)
export class PushWorker extends WorkerHost {
  constructor(
    private readonly pushService: PushService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<{ deliveryId: string }>): Promise<void> {
    await this.pushService.processDelivery(
      job.data.deliveryId,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `Push job ${job.id} completed`,
    );
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error) {
    console.log(
      `Push job ${job.id} failed: ${error.message}`,
    );

    console.log(
      `Attempts made: ${job.attemptsMade}`,
    );

    await this.prisma.delivery.update({
      where: {
        id: job.data.deliveryId,
      },
      data: {
        retryCount: job.attemptsMade,
        errorDetails: error.message,
      },
    });

    if (job.attemptsMade >= (job.opts.attempts ?? 1)) {
      await this.prisma.delivery.update({
        where: {
          id: job.data.deliveryId,
        },
        data: {
          status: Status.FAILED,
        },
      });

      console.log(
        `Delivery ${job.data.deliveryId} permanently failed`,
      );
    }
  }
}