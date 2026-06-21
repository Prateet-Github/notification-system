import { Injectable } from '@nestjs/common';

import { PushProvider } from './push.provider';
import { FirebaseService } from '@/firebase/firebase.service';

@Injectable()
export class FcmPushProvider extends PushProvider {
  constructor(
    private readonly firebaseService: FirebaseService,
  ) {
    super();
  }

  async send(
    to: string,
    subject: string,
    body: string,
  ): Promise<{
    provider: string;
    providerId: string;
  }> {
    const messageId =
      await this.firebaseService
        .getMessaging()
        .send({
          token: to,
          notification: {
            title: subject,
            body,
          },
        });

    return {
      provider: 'Firebase',
      providerId: messageId,
    };
  }
}