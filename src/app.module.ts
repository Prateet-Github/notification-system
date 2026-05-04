import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import configuration from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HealthModule,

  ]
})
export class AppModule { }

