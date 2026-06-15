import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SseService {
  private clients = new Map<
    string,
    Subject<MessageEvent>
  >();

  addClient(userId: string): Observable<MessageEvent> {
    const subject = new Subject<MessageEvent>();
    this.clients.set(userId, subject);
    return subject.asObservable();
  }

  removeClient(userId: string) {
    const subject = this.clients.get(userId);
    if (subject) {
      subject.complete();
      this.clients.delete(userId);
      console.log(`Client disconnected and cleaned up: ${userId}`);
    }
  }

  publish(userId: string, payload: any) {
    const client = this.clients.get(userId);
    if (client) {
      client.next({
        data: {
          id: payload.id,
          title: payload.title,
          message: payload.message,
        },
      } as MessageEvent);
    }
  }
}
