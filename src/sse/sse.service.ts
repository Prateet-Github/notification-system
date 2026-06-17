import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SseService {
  // for multiple clinets add [] to the value of the map and push to the array instead of next
  // will check it later on making multiple instances
  private clients = new Map<
    string,
    Subject<MessageEvent>
  >();

  addClient(userId: string): Observable<MessageEvent> {
    const subject = new Subject<MessageEvent>();
    this.clients.set(userId, subject);

    // console.log('Client connected:', userId);
    // console.log('Total clients:', this.clients.size);

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
    // console.log('Publishing to:', userId);
    // console.log('Client exists:', this.clients.has(userId));
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
