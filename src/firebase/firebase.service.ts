import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  initializeApp,
  cert,
  getApps,
} from 'firebase-admin/app';

import {
  getMessaging,
  Messaging,
} from 'firebase-admin/messaging';

import serviceAccount from '../config/service-account.json';

@Injectable()
export class FirebaseService {
  private readonly messaging: Messaging;

  constructor(private readonly configService: ConfigService) {
    const app =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
          credential: cert({
            projectId:
              this.configService.get(
                'firebase.projectId',
              ),

            clientEmail:
              this.configService.get(
                'firebase.clientEmail',
              ),

            privateKey:
              this.configService
                .get('firebase.privateKey')
                ?.replace(/\\n/g, '\n'),
          }),
        });

    this.messaging = getMessaging(app);
  }

  getMessaging(): Messaging {
    return this.messaging;
  }
}