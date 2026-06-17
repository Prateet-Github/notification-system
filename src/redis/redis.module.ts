import { Module, Sse } from '@nestjs/common';
import { RedisPublisherService } from './redis.publish.service';
import { RedisSubscriberService } from './redis.subscribe.service';
import { SseModule } from '@/sse/sse.module';

@Module({
  imports: [SseModule],
  providers: [RedisPublisherService, RedisSubscriberService],
  exports: [RedisPublisherService, RedisSubscriberService],
})
export class RedisModule { }
