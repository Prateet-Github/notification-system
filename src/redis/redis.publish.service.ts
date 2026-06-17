import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { getRedisConfig } from '../config/redis.config';

@Injectable()
export class RedisPublisherService {
  private readonly redis: Redis;

  constructor(private readonly configService: ConfigService) {
    this.redis = new Redis(
      getRedisConfig(this.configService),
    );
  }

  async publish(channel: string, payload: unknown): Promise<void> {
    await this.redis.publish(
      channel,
      JSON.stringify(payload),
    );
  }

}