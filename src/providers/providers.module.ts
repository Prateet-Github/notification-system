import { Module } from '@nestjs/common';
import { EmailProvider } from './email/email.provider';
import { FakeEmailProvider } from './email/fake-email.provider';

@Module({
  providers: [
    {
      provide: EmailProvider,
      useClass: FakeEmailProvider,
    },
  ],
  exports: [EmailProvider],
})
export class ProvidersModule { }
