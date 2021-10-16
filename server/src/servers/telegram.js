const { Telegraf } = require('telegraf')

// "lt --port 9093 --subdomain trixolma" for work
const start = () => {
  if (!process.env.TELEGRAM_TOKEN) throw new Error('Set telegram token for use bot')

  const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

  bot.use(Telegraf.log())

  bot.help((ctx) => ctx.reply("Справка в процессе"))

  if (process.env.NODE_ENV === 'development') {
    bot.launch({
      webhook: {
        domain: process.env.TELEGRAM_WEBHOOK_PATH,
        port: process.env.TELEGRAM_BOT_PORT
      }
    })
  } else {
    bot.launch()
  }
}

module.exports = start