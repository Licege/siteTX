const { dictionary } = require('./dictionary')
const { CMD_TEXT } = require('./config/constants');
const { start, showBalance, contactHandler } = require('./controllers');

exports.commands = (bot) => {
  bot.command('start', start)
  bot.help((ctx) => ctx.reply(dictionary.commands))

  bot.on('contact', contactHandler)

  bot.hears(CMD_TEXT.Balance, showBalance)
}
