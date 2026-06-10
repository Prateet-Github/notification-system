import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProvidersModule } from '../providers/providers.module';

import { EmailWorker } from './email/email.worker';
import { EmailService } from './email/email.service';

import { SmsWorker } from './sms/sms.worker';
import { SmsService } from './sms/sms.service';

import { PushWorker } from './push/push.worker';
import { PushService } from './push/push.service';

@Module({
  imports: [
    PrismaModule,
    ProvidersModule,
  ],
  providers: [
    EmailWorker,
    EmailService,
    SmsWorker,
    SmsService,
    PushWorker,
    PushService,
  ],
})
export class WorkersModule { }