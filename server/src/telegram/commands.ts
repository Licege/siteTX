import { dictionary } from './dictionary';
import { CMD_TEXT } from './config/constants';
import { start, showBalance, contactHandler } from './controllers';

export const commands = (bot: any) => {
  bot.command('start', start)
  bot.help((ctx: any) => ctx.reply(dictionary.commands))

  bot.on('contact', contactHandler)

  bot.hears(CMD_TEXT.Balance, showBalance)
}
