import { Body, Controller, Post, Get, Param, Inject } from '@nestjs/common';
import { PushTokenService } from './push-token.service';
import { CreatePushTokenDto } from './dto/create-push-token.dto';
import { PushProvider } from '@/providers/push/push.provider';

@Controller('push-tokens')
export class PushTokenController {
  constructor(
    private readonly pushTokenService: PushTokenService,
    @Inject(PushProvider)

    private readonly pushProvider: PushProvider,
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

  @Post('test/:userId')
  async testPush(
    @Param('userId') userId: string,
  ) {
    const tokens =
      await this.pushTokenService.findByUserId(
        userId,
      );
    const token =
      tokens[tokens.length - 1]?.token;
    if (!token) {
      throw new Error(
        'No push token found',
      );
    }
    console.log(tokens);
    console.log('Using token:', token);
    return this.pushProvider.send(
      token,
      'Push Test',
      'Hello from Firebase!',
    )
  }
}