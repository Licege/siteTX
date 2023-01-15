import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TELEGRAM_SERVICE } from './constants';

enum Commands {
  SendMessage = 'send.message',
}

@Injectable()
export class TelegramService {
  constructor(@Inject(TELEGRAM_SERVICE) private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf(Commands.SendMessage);

    await this.client.connect();
  }

  sendMessage(message: string) {
    console.log('message', message);
    return this.client.send(Commands.SendMessage, message);
  }
}
