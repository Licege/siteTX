import { Markup } from 'telegraf';
import { CMD_TEXT } from './config/constants';

export const noAuthMenu = Markup.keyboard([
  Markup.button.contactRequest('Войти по номеру телефона')
]).resize(false)

export const mainMenu = Markup.keyboard([
  [CMD_TEXT.Balance]
]).resize();
