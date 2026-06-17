import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { ProvidersModule } from '../providers/providers.module';

import { EmailWorker } from './email/email.worker';
import { EmailService } from './email/email.service';

import { SmsWorker } from './sms/sms.worker';
import { SmsService } from './sms/sms.service';

import { PushWorker } from './push/push.worker';
import { PushService } from './push/push.service';

import { InAppWorker } from './in-app/in-app.worker';
import { InAppService } from './in-app/in-app.service';
import { SseModule } from '@/sse/sse.module';
import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [
    PrismaModule,
    ProvidersModule,
    SseModule,
    RedisModule,
  ],
  providers: [
    EmailWorker,
    EmailService,
    SmsWorker,
    SmsService,
    PushWorker,
    PushService,
    InAppWorker,
    InAppService,
  ],
})
export class WorkersModule { }