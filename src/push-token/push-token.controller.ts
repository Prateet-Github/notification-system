import { Body, Controller, Post, Get, Param, Inject } from '@nestjs/common';
import { PushTokenService } from './push-token.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';

@Controller('push-tokens')
export class PushTokenController {
  constructor(
    private readonly pushTokenService: PushTokenService,

  ) { }

  @Post()
  create(
    @Body() dto: CreatePushTokenDto,
  ) {
    return this.pushTokenService.create(dto);
  }

  @Get(':userId')
  findByUserId(
    @Param('userId') userId: string,
  ) {
    return this.pushTokenService.findByUserId(
      userId,
    );
  }
}