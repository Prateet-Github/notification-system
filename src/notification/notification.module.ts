import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PreferencesModule } from '../preferences/preferences.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [PrismaModule, PreferencesModule, QueueModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule { }