import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getJsonHello(): {greeting: string} {
    return {greeting: 'Hello World!'}
  }
}
