import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PreferencesModule } from '../preferences/preferences.module';
import { QueueModule } from '../queue/queue.module';
import { SseModule } from '@/sse/sse.module';

@Module({
  imports: [PrismaModule, PreferencesModule, QueueModule, SseModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule { }