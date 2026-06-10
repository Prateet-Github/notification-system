import { Module } from '@nestjs/common';
import { EmailWorker } from './email/email.worker';

@Module({
  providers: [EmailWorker],
})
export class WorkersModule { }
