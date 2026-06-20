import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SmsProvider } from './sms.provider';
import twilio from 'twilio';

@Injectable()
export class TwilioSmsProvider extends SmsProvider {
  private readonly client: twilio.Twilio;

  constructor(
    private readonly configService: ConfigService,
  ) {
    super();

    this.client = twilio(
      this.configService.get<string>(
        'twilio.accountSid',
      ),
      this.configService.get<string>(
        'twilio.authToken',
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
    const message =
      await this.client.messages.create({
        from: this.configService.get<string>(
          'twilio.phoneNumber',
        ),
        to,
        body,
      });

    return {
      provider: 'Twilio',
      providerId: message.sid,
    };
  }
}