import { Module } from '@nestjs/common';
import { EmailProvider } from './email/email.provider';
import { FakeEmailProvider } from './email/fake-email.provider';

import { SmsProvider } from './sms/sms.provider';
import { FakeSmsProvider } from './sms/fake-sms.provider';

import { PushProvider } from './push/push.provider';
import { FakePushProvider } from './push/fake-push.provider';
import { InAppProvider } from './in-app/in-app.provider';
import { FakeInAppProvider } from './in-app/fake-in-app.provider';

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
    {
      provide: PushProvider,
      useClass: FakePushProvider,
    },
    {
      provide: InAppProvider,
      useClass: FakeInAppProvider,
    },
  ],
  exports: [EmailProvider, SmsProvider, PushProvider, InAppProvider],
})
export class ProvidersModule { }
