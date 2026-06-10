import { Module } from '@nestjs/common';
import { EmailWorker } from './email/email.worker';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailService } from './email/email.service';

@Module({
  providers: [EmailWorker, EmailService],
  imports: [PrismaModule],
})
export class WorkersModule { }
