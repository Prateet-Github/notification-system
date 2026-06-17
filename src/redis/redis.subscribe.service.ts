import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { getRedisConfig } from '../config/redis.config';
import { SseService } from '@/sse/sse.service';

@Injectable()
export class RedisSubscriberService implements OnModuleInit {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisSubscriberService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly sseService: SseService,
  ) {
    this.redis = new Redis(
      getRedisConfig(this.configService),
    );
  }

  async onModuleInit() {
    await this.redis.subscribe('notifications');

    this.logger.log(
      'Subscribed to notifications channel',
    );

    // this.redis.on(
    //   'message',
    //   (channel, message) => {
    //     this.logger.log(
    //       `[${channel}] ${message}`,
    //     );
    //   },
    // );
    this.redis.on(
      'message',
      (channel, message) => {
        this.logger.log(
          `[${channel}] ${message}`,
        );

        const event = JSON.parse(message);

        this.sseService.publish(
          event.userId,
          event.payload,
        );
      },
    );
  }
}