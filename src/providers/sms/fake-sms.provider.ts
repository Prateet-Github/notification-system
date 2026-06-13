import { Injectable } from '@nestjs/common';
import { SmsProvider } from './sms.provider';
import { randomUUID } from 'crypto';

@Injectable()
export class FakeSmsProvider implements SmsProvider {
  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<{
    provider: string;
    providerId: string;
  }> {
    console.log('Sending fake SMS...');
    console.log({ to, subject, body });

    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      throw new Error('Fake SMS provider failure');
    }

    console.log('Fake SMS sent successfully');

    return {
      provider: 'FakeSmsProvider',
      providerId: randomUUID(),
    };
  }
}