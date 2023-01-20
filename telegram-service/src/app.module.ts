import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './modules';
import { sessionMiddleware } from './middlewares';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_TOKEN,
      middlewares: [sessionMiddleware],
    }),
    BotModule,
  ],
})
export class AppModule {}
