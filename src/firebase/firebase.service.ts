import { Injectable } from '@nestjs/common';

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

  constructor() {
    const app =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
          credential: cert(
            serviceAccount as any,
          ),
        });

    this.messaging = getMessaging(app);
  }

  getMessaging(): Messaging {
    return this.messaging;
  }
}