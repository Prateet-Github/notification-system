import { ConfigService } from '@nestjs/config';

export const getRedisConfig = (configService: ConfigService) => ({
  host: configService.get<string>('redis.host'),
  port: configService.get<number>('redis.port'),
});