import { Module } from '@nestjs/common';
import { EmailProvider } from './email/email.provider';
import { FakeEmailProvider } from './email/fake-email.provider';

import { SmsProvider } from './sms/sms.provider';
import { FakeSmsProvider } from './sms/fake-sms.provider';

import { PushProvider } from './push/push.provider';
import { FakePushProvider } from './push/fake-push.provider';
import { InAppProvider } from './in-app/in-app.provider';
import { FakeInAppProvider } from './in-app/fake-in-app.provider';
import { ResendEmailProvider } from './email/resend-email.provider';
import { TwilioSmsProvider } from './sms/twilio-sms.provider';
import { FirebaseModule } from '@/firebase/firebase.module';
import { FcmPushProvider } from './push/fcm-push.provider';

@Module({
  providers: [
    {
      provide: EmailProvider,
      useClass: ResendEmailProvider,
    },
    {
      provide: SmsProvider,
      useClass: TwilioSmsProvider,
    },
    {
      provide: PushProvider,
      useClass: FcmPushProvider,
    },
    {
      provide: InAppProvider,
      useClass: FakeInAppProvider,
    },
  ],
  exports: [EmailProvider, SmsProvider, PushProvider, InAppProvider],
  imports: [FirebaseModule],
})
export class ProvidersModule { }
