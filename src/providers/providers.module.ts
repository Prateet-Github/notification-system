import { Module } from '@nestjs/common';
import { EmailProvider } from './email/email.provider';
import { FakeEmailProvider } from './email/fake-email.provider';

import { SmsProvider } from './sms/sms.provider';
import { FakeSmsProvider } from './sms/fake-sms.provider';

@Module({
  providers: [
    {
      provide: EmailProvider,
      useClass: FakeEmailProvider,
    },
    {
      provide: SmsProvider,
      useClass: FakeSmsProvider,
    },
  ],
  exports: [EmailProvider, SmsProvider],
})
export class ProvidersModule { }
