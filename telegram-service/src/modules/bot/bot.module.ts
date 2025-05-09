import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotUpdate } from './bot.update';
import { BotService } from './bot.service';

@Module({
  controllers: [BotController],
  providers: [BotService, BotUpdate],
})
export class BotModule {}
