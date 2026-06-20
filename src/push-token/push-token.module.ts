import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';

import { PushTokenController } from './push-token.controller';
import { PushTokenService } from './push-token.service';

@Module({
  imports: [PrismaModule],
  controllers: [PushTokenController],
  providers: [PushTokenService],
})
export class PushTokenModule { }