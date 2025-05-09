import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BotService } from './bot.service';

enum Commands {
  SendMessage = 'send.message',
}

@Controller('telegram-bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @MessagePattern(Commands.SendMessage)
  sendMessage(@Payload() message: string) {
    return this.botService.sendMessage(message);
  }
}
