import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProvidersModule } from '../providers/providers.module';

import { EmailWorker } from './email/email.worker';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    PrismaModule,
    ProvidersModule,
  ],
  providers: [
    EmailWorker,
    EmailService,
  ],
})
export class WorkersModule { }