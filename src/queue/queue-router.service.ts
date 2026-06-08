import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

import { QUEUES } from './constants';

@Injectable()
export class QueueRouterService {
  constructor(
    @InjectQueue(QUEUES.EMAIL)
    private readonly emailQueue: Queue,

    @InjectQueue(QUEUES.SMS)
    private readonly smsQueue: Queue,

    @InjectQueue(QUEUES.PUSH)
    private readonly pushQueue: Queue,

    @InjectQueue(QUEUES.IN_APP)
    private readonly inAppQueue: Queue,
  ) { }

  private getPriority(priority: string): number {
    switch (priority) {
      case 'HIGH':
        return 1;

      case 'MEDIUM':
        return 5;

      case 'LOW':
        return 10;

      default:
        return 10;
    }
  }

  async route(
    deliveryId: string,
    channel: string,
    priority: string,
  ) {
    // TODO: Which queue? With what priority?
  }
}