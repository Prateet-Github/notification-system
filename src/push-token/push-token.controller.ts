import { Body, Controller, Post } from '@nestjs/common';
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
}