import { Injectable } from '@nestjs/common';
import { SmsProvider } from './sms.provider';

@Injectable()
export class FakeSmsProvider implements SmsProvider {
  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    console.log('Sending fake SMS...');
    console.log({ to, subject, body });

    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      throw new Error('Fake SMS provider failure');
    }

    console.log('Fake SMS sent successfully');
  }
}