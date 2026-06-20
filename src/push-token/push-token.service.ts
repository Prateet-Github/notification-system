import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';

@Injectable()
export class PushTokenService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(
    dto: CreatePushTokenDto,
  ) {
    return this.prisma.pushToken.upsert({
      where: {
        token: dto.token,
      },
      update: {},
      create: dto,
    });
  }
}