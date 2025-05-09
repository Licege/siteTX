import { Injectable } from '@nestjs/common';
import { TelegramService } from '../modules/telegram/telegram.service';

@Injectable()
export class TestService {
  constructor(private telegramService: TelegramService) {}

  async test() {
    return this.telegramService.sendMessage('test message 1');
  }
}
