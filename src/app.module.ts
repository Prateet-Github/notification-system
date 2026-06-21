import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';
import { PreferencesModule } from './preferences/preferences.module';
import { QueueModule } from './queue/queue.module';
import { WorkersModule } from './workers/workers.module';
import { ProvidersModule } from './providers/providers.module';
import { SseModule } from './sse/sse.module';
import { RedisModule } from './redis/redis.module';
import { PushTokenModule } from './push-token/push-token.module';
import { FirebaseModule } from './firebase/firebase.module';
import configuration from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HealthModule,
    PrismaModule,
    NotificationModule,
    PreferencesModule,
    QueueModule,
    WorkersModule,
    ProvidersModule,
    SseModule,
    RedisModule,
    PushTokenModule,
    FirebaseModule,

  ]
})
export class AppModule { }

