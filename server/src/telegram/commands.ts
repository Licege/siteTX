// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { dictionary } = require('./dictionary')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CMD_TEXT'.
const { CMD_TEXT } = require('./config/constants');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'start'.
const { start, showBalance, contactHandler } = require('./controllers');

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.commands = (bot: any) => {
  bot.command('start', start)
  bot.help((ctx: any) => ctx.reply(dictionary.commands))

  bot.on('contact', contactHandler)

  bot.hears(CMD_TEXT.Balance, showBalance)
}
