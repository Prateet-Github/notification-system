import {
  Controller,
  Query,
  Sse,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';

import { SseService } from './sse.service';
import { Post } from '@nestjs/common';

@Controller('sse')
export class SseController {
  constructor(
    private readonly sseService: SseService,
  ) { }

  @Sse('stream')
  stream(
    @Query('userId') userId: string,
  ): Observable<MessageEvent> {
    return this.sseService.addClient(
      userId,
    );
  }

  @Post('test')
  test() {
    this.sseService.publish('123', {
      id: '1',
      title: 'Test Notification',
      message: 'Hello from SSE',
    });

    return { success: true };
  }
}