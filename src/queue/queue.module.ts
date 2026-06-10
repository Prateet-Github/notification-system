import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUES } from './constants';
import { QueueRouterService } from './queue-router.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,

    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get<string>('redis.host'),
          port: configService.get<number>('redis.port'),
        },
      }),
    }),

    BullModule.registerQueue(
      { name: QUEUES.EMAIL },
      { name: QUEUES.SMS },
      { name: QUEUES.PUSH },
      { name: QUEUES.IN_APP },
    ),
  ],

  providers: [QueueRouterService],

  exports: [QueueRouterService],
})

export class QueueModule { }