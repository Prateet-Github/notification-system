import {
  Processor,
  WorkerHost,
  OnWorkerEvent,
} from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { QUEUES } from '../../queue/constants';
import { EmailService } from './email.service';
import { PrismaService } from '@/prisma/prisma.service';
import { Status } from '@prisma/client';

@Injectable()
@Processor(QUEUES.EMAIL)
export class EmailWorker extends WorkerHost {
  constructor(
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async process(job: Job<{ deliveryId: string }>): Promise<void> {
    await this.emailService.processDelivery(
      job.data.deliveryId,
    );
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `Email job ${job.id} completed`,
    );
  }

  @OnWorkerEvent('failed')
  async onFailed(
    job: Job | undefined,
    error: Error,
  ) {
    console.error(
      `Email job ${job?.id} failed: ${error.message}`,
    );

    console.log(
      `Attempts made: ${job?.attemptsMade}`,
    );

    if (
      job &&
      job.attemptsMade === job.opts.attempts
    ) {
      await this.prisma.delivery.update({
        where: {
          id: job.data.deliveryId,
        },
        data: {
          status: Status.FAILED,
          retryCount: job.attemptsMade,
        },
      });

      console.log(
        `Delivery ${job.data.deliveryId} permanently failed`,
      );
    }
  }
}