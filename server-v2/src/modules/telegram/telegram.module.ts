import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { TELEGRAM_SERVICE, TELEGRAM_CONSUMER, CLIENT_ID } from './constants';

@Module({
  controllers: [TelegramController],
  providers: [
    TelegramService,
    {
      provide: TELEGRAM_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const telegramBroker = configService.get('telegram.broker');

        return ClientProxyFactory.create({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: CLIENT_ID,
              brokers: [telegramBroker],
            },
            consumer: {
              groupId: TELEGRAM_CONSUMER,
            },
          },
        });
      },
    },
  ],
  exports: [TelegramService],
  imports: [ConfigModule],
})
export class TelegramModule {}
