const { Telegraf } = require('telegraf')
const { commands } = require('../telegram/commands')
const { TelegramBot } = require('../telegram/bot');

// localtunnel
// "lt --port 9093 --subdomain trixolma" for work
const start = () => {
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

module.exports = start
