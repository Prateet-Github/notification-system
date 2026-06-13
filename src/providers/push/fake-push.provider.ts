import { Injectable } from '@nestjs/common';
import { PushProvider } from './push.provider';
import { randomUUID } from 'crypto';

@Injectable()
export class FakePushProvider implements PushProvider {
  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<
    {
      provider: string;
      providerId: string;
    }> {
    console.log('Sending fake push...');
    console.log({ to, subject, body });

    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      throw new Error('Fake push provider failure');
    }

    console.log('Fake push sent successfully');

    return {
      provider: 'FakePushProvider',
      providerId: randomUUID(),
    };
  }
}