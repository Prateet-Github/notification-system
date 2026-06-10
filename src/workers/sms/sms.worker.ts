import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
} from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { QUEUES } from '../../queue/constants';
import { SmsService } from './sms.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
@Processor(QUEUES.SMS)
export class SmsWorker extends WorkerHost {
  constructor(
    private readonly smsService: SmsService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<{ deliveryId: string }>): Promise<void> {
    await this.smsService.processDelivery(
      job.data.deliveryId,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `Sms job ${job.id} completed`,
    );
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, error: Error) {
    await this.prisma.delivery.update({
      where: {
        id: job.data.deliveryId,
      },
      data: {
        retryCount: job.attemptsMade,
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