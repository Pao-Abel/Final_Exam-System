import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as messegeInterface from './messege.interface';

export interface Message {
  content: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private messageSubject = new Subject<messegeInterface.Message>();
  public message$ = this.messageSubject.asObservable();

  sendMessage(message: messegeInterface.Message) {
    this.messageSubject.next(message);
  }
}

