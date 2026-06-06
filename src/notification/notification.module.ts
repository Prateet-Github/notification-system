import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PreferencesModule } from '../preferences/preferences.module';

@Module({
  imports: [PrismaModule, PreferencesModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule { }