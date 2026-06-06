import { Injectable } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class PreferencesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreatePreferenceDto) {
    return this.prisma.userPreference.create({
      data: {
        userId: dto.userId,

        channels: {
          create: [
            {
              channel: 'EMAIL',
              isEnabled: dto.email,
            },
            {
              channel: 'SMS',
              isEnabled: dto.sms,
            },
            {
              channel: 'PUSH',
              isEnabled: dto.push,
            },
            {
              channel: 'IN_APP',
              isEnabled: dto.inApp,
            },
          ],
        },
      },

      include: {
        channels: true,
      },
    });
  }
}
