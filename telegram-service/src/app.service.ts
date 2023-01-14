import { Injectable } from '@nestjs/common';
import { KafkaMessageInterface } from './kafka-message.interface';

@Injectable()
export class AppService {
  sendMessage(message: KafkaMessageInterface<string>) {
    console.log('message', message);

    return message;
  }
}
