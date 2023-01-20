import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDto } from './dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMessage<T>(dto: SendMailDto<T>) {
    return this.mailerService.sendMail(dto);
  }
}
