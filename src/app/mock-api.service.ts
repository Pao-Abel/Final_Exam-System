import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

@Injectable()
export class MockApiService implements InMemoryDbService {
  createDb() {
    const users = [
      { id: 1, email: 'john@sample.com', password: 'password123' },
      { id: 2, email: 'jane@sample.com', password: 'secret456' }
    ];

    const messages = [
      { id: 1, sender: 'john', receiver: 'jane', message: 'Hello Jane!' },
      { id: 2, sender: 'jane', receiver: 'john', message: 'Hi John!' }
    ];

    return { users, messages };
  }

  // Override the HTTP POST method to handle login requests
  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'users' && reqInfo.req.url === 'api/users') {
      return this.authenticateUser(reqInfo);
    }
    return undefined; // Let the default InMemoryDbService handle other requests
  }

  // Custom login authentication logic
  private authenticateUser(reqInfo: RequestInfo) {
    const { email, password } = reqInfo.utils.getJsonBody(reqInfo.req);
    const users = reqInfo.collection;
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      const response: ResponseOptions = {
        body: { id: user.id, email: user.email },
        status: 200
      };
      return reqInfo.utils.createResponse$(() => response);
    } else {
      const response: ResponseOptions = {
        body: { error: 'Invalid email or password' },
        status: 401
      };
      return reqInfo.utils.createResponse$(() => response);
    }
  }
}
