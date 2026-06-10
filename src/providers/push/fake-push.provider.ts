import { Injectable } from '@nestjs/common';
import { PushProvider } from './push.provider';

@Injectable()
export class FakePushProvider implements PushProvider {
  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    console.log('Sending fake push...');
    console.log({ to, subject, body });

    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      throw new Error('Fake push provider failure');
    }

    console.log('Fake push sent successfully');
  }
}