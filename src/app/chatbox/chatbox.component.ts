import { Component } from '@angular/core';

interface Message {
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbox',
  template: `
    <div class="container">
  <div class="chat-history">
    <div class="message" *ngFor="let message of messages">
      {{ message.content }} - {{ message.timestamp | date: 'shortTime' }}
    </div>
  </div>
  <div class="chat-input row">
  <div class="col-lg-9">
    <input [(ngModel)]="newMessage" placeholder="Type your message..." class="form-control">
  </div>
  <div class="col-lg-3">
    <button (click)="sendMessage()" class="btn btn-primary">Send</button>
  </div>
</div>

</div>

  `,
  styles: [
    `
    .chat-history {
      height: 200px;
      overflow-y: scroll;
      border: 1px solid #ccc;
      padding: 10px;
      background-color:white;
    }

    .chat-input {
      margin-top: 10px;
    }

    .message {
      margin-bottom: 5px;
    }
    `,
  ],
})
export class ChatboxComponent {
  messages: Message[] = [];
  newMessage: string = '';

  sendMessage() {
    if (this.newMessage) {
      const message: Message = {
        content: this.newMessage,
        timestamp: new Date(),
      };

      this.messages.push(message);
      this.newMessage = '';
    }
  }

}

