import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUES } from '../../queue/constants';

@Processor(QUEUES.EMAIL)
export class EmailWorker extends WorkerHost {
  async process(job: Job<any>): Promise<void> {
    console.log('Email job received:', job.data);
  }
}