import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

import { EmailProvider } from './email.provider';

@Injectable()
export class ResendEmailProvider extends EmailProvider {
  private readonly resend: Resend;

  constructor(
    private readonly configService: ConfigService,
  ) {
    super();

    this.resend = new Resend(
      this.configService.get<string>(
        'resend.apiKey',
      ),
    );
  }

  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<{
    provider: string;
    providerId: string;
  }> {
    const response = await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      subject,
      html: body,
    });

    return {
      provider: 'Resend',
      providerId: response.data?.id ?? '',
    };
  }
}