import { Injectable } from '@nestjs/common';

@Injectable()
export class SseService {
  private clients = new Map();
}
