import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TelegramModule } from '../modules';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [TelegramModule],
})
export class TestModule {}
