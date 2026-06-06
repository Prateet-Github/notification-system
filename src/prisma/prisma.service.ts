import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private config: ConfigService) {
    super({
      accelerateUrl: config.getOrThrow<string>('database.url'),
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}