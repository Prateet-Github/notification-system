import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PRIORITIES } from './constants';
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

  async route(
    deliveryId: string,
    channel: string,
    priority: string,
  ) {
    const queuePriority =
      PRIORITIES[priority as keyof typeof PRIORITIES] ??
      PRIORITIES.LOW;

    // TODO: Which queue? With what priority?
  }
}