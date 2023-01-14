import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

const { TELEGRAM_HOST = 'localhost', TELEGRAM_PORT = '9095' } = process.env;
const TELEGRAM_BROKER = `${TELEGRAM_HOST}:${TELEGRAM_PORT}`;
const TELEGRAM_CONSUMER = 'telegram-consumer';

enum Commands {
  SendMessage = 'send.message',
}

@Injectable()
export class TelegramService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'telegram-service',
        brokers: [TELEGRAM_BROKER],
      },
      consumer: {
        groupId: TELEGRAM_CONSUMER,
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf(Commands.SendMessage);

    await this.client.connect();
  }

  sendMessage(message: string) {
    console.log('message', message);
    return this.client.send(Commands.SendMessage, message);
  }
}
