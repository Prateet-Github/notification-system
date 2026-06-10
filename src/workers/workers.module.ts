import { Module } from '@nestjs/common';
import { EmailWorker } from './email/email.worker';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [EmailWorker],
  imports: [PrismaModule],
})
export class WorkersModule { }
