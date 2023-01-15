import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TELEGRAM_SERVICE, TELEGRAM_CONSUMER, CLIENT_ID } from './constants';

const { TELEGRAM_HOST = 'localhost', TELEGRAM_PORT = '9095' } = process.env;
const TELEGRAM_BROKER = `${TELEGRAM_HOST}:${TELEGRAM_PORT}`;

@Module({
  controllers: [TelegramController],
  providers: [TelegramService],
  exports: [TelegramService],
  imports: [
    ClientsModule.register([
      {
        name: TELEGRAM_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: CLIENT_ID,
            brokers: [TELEGRAM_BROKER],
          },
          consumer: {
            groupId: TELEGRAM_CONSUMER,
          },
        },
      },
    ]),
  ],
})
export class TelegramModule {}
