import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { QUEUES } from '../../queue/constants';
import { EmailService } from './email.service';

@Injectable()
@Processor(QUEUES.EMAIL)
export class EmailWorker extends WorkerHost {
  constructor(
    private readonly emailService: EmailService,
  ) {
    super();
  }

  async process(job: Job<{ deliveryId: string }>): Promise<void> {
    await this.emailService.processDelivery(
      job.data.deliveryId,
    );
  }
}