import { Markup } from 'telegraf';

export function noAuthButtons() {
  return Markup.keyboard([
    Markup.button.contactRequest('Войти по номеру телефона'),
  ]).resize(false);
}
