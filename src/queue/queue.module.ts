import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QUEUES } from './constants';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    BullModule.registerQueue(
      { name: QUEUES.EMAIL },
      { name: QUEUES.SMS },
      { name: QUEUES.PUSH },
      { name: QUEUES.IN_APP },
    ),
  ],
})

export class QueueModule { }