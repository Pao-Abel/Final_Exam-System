import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

@Injectable()
export class MockApiService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, username: 'john', fullName: 'John Doe', email: 'john@sample.com', password: 'password123' },
      { id: 2, username: 'jane', fullName: 'Jane Smith', email: 'jane@sample.com', password: 'secret456' }
    ];

    const messages = [
      { id: 1, sender: 'john', receiver: 'jane', message: 'Hello Jane!' },
      { id: 2, sender: 'jane', receiver: 'john', message: 'Hi John!' }
    ];

    return { users, messages };
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'users') {
      if (reqInfo.req.url === 'api/users/login') {
        return this.authenticateUser(reqInfo);
      } else if (reqInfo.req.url === 'api/users/register') {
        return this.registerUser(reqInfo);
      }
    }
    return undefined;
  }

  private authenticateUser(reqInfo: RequestInfo) {
    // Authentication logic here
  }

  private registerUser(reqInfo: RequestInfo) {
    const newUser = reqInfo.utils.getJsonBody(reqInfo.req);
    const users = reqInfo.collection;
    const existingUser = users.find((user: any) => user.email === newUser.email);

    if (existingUser) {
      const response: ResponseOptions = {
        body: { error: 'Email already registered' },
        status: 400
      };
      return reqInfo.utils.createResponse$(() => response);
    } else {
      const newUserId = users.length + 1;
      newUser.id = newUserId;
      users.push(newUser);

      const response: ResponseOptions = {
        body: { id: newUser.id, email: newUser.email },
        status: 201
      };
      return reqInfo.utils.createResponse$(() => response);
    }
  }
}
