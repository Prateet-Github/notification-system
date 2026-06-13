import { Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';
import { randomUUID } from 'crypto';

@Injectable()
export class FakeEmailProvider implements EmailProvider {
  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<{
    provider: string;
    providerId: string;
  }> {
    console.log('Sending fake email...');
    console.log({ to, subject, body });

    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      throw new Error('Fake email provider failure');
    }

    console.log('Fake email sent successfully');
    return {
      provider: 'FakeEmailProvider',
      providerId: randomUUID(),
    };
  }
}