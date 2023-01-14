import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KafkaMessageInterface } from './kafka-message.interface';

enum Commands {
  SendMessage = 'send.message',
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern(Commands.SendMessage)
  sendMessage(@Payload() message: KafkaMessageInterface<string>) {
    return this.appService.sendMessage(message);
  }
}
