import { Injectable } from '@nestjs/common';
import { InAppProvider } from './in-app.provider';
import { randomUUID } from 'crypto';

@Injectable()
export class FakeInAppProvider implements InAppProvider {
  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<
    {
      provider: string;
      providerId: string;
    }> {
    console.log('Sending fake in-app message...');
    console.log({ to, subject, body });

    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      throw new Error('Fake in-app provider failure');
    }

    console.log('Fake in-app message sent successfully');

    return {
      provider: 'FakeInAppProvider',
      providerId: randomUUID()
    }
  }
}