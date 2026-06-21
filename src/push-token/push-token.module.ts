import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';

import { PushTokenController } from './push-token.controller';
import { PushTokenService } from './push-token.service';
import { ProvidersModule } from '@/providers/providers.module';

@Module({
  imports: [PrismaModule, ProvidersModule],
  controllers: [PushTokenController],
  providers: [PushTokenService],
  exports: [PushTokenService],
})
export class PushTokenModule { }