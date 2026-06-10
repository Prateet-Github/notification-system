import { Injectable } from '@nestjs/common';
import { EmailProvider } from './email.provider';

@Injectable()
export class FakeEmailProvider implements EmailProvider {
  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    console.log('Sending fake email...');
    console.log({ to, subject, body });

    const shouldFail = Math.random() < 0.5;

    if (shouldFail) {
      throw new Error('Fake email provider failure');
    }

    console.log('Fake email sent successfully');
  }
}