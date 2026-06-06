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

  async findByUserId(userId: string) {
    return this.prisma.userPreference.findUnique({
      where: {
        userId,
      },
      include: {
        channels: true,
      },
    });
  }

  async update(userId: string, dto: UpdatePreferenceDto) {
    const preference = await this.prisma.userPreference.findUnique({
      where: {
        userId,
      },
      include: {
        channels: true,
      },
    });

    if (!preference) {
      throw new Error('Preferences not found');
    }

    for (const channel of preference.channels) {
      await this.prisma.userChannel.update({
        where: {
          id: channel.id,
        },
        data: {
          isEnabled:
            channel.channel === 'EMAIL'
              ? dto.email
              : channel.channel === 'SMS'
                ? dto.sms
                : channel.channel === 'PUSH'
                  ? dto.push
                  : dto.inApp,
        },
      });
    }

    return this.findByUserId(userId);
  }

}
