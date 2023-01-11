// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { Telegraf } = require('telegraf')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'commands'.
const { commands } = require('../telegram/commands')
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'TelegramBo... Remove this comment to see the full error message
const { TelegramBot } = require('../telegram/bot');

// localtunnel
// "lt --port 9093 --subdomain trixolma" for work
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'start'.
const start = () => {
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  if (!process.env.TELEGRAM_TOKEN)
    throw new Error('Set telegram token for use bot')

  // const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
  const bot = new Telegraf('5898830355:AAHu4rkhukLhJsfK1taJPoTI2rTE74kXsRs') // dev bot
  TelegramBot.initializeBot(bot);

  bot.use(Telegraf.log())

  // send message
  // TelegramBot.sendMessage(295949519, 'сообщение!')
  // bot.telegram.sendMessage(295949519, 'Hello!')

  commands(bot)
  bot.launch()

  // if (process.env.NODE_ENV === 'development') {
  //   bot.launch({
  //     webhook: {
  //       domain: process.env.TELEGRAM_WEBHOOK_PATH,
  //       port: process.env.TELEGRAM_BOT_PORT
  //     }
  //   })
  // } else {
  //   bot.launch()
  // }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = start
