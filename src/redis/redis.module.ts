import { Module } from '@nestjs/common';
import { RedisPublisherService } from './redis.publish.service';
import { RedisSubscriberService } from './redis.subscribe.service';

@Module({
  providers: [RedisPublisherService, RedisSubscriberService],
  exports: [RedisPublisherService, RedisSubscriberService],
})
export class RedisModule { }
