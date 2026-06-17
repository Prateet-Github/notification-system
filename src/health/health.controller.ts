import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return {
      status: 'OK',
      pid: process.pid,
      port: process.env.PORT,
    };
  }
}
