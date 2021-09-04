const { Telegraf } = require('telegraf')

const start = () => {
  if (!process.env.TELEGRAM_TOKEN) throw new Error('Set telegram token for use bot')

  const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

  bot.use(Telegraf.log())

  bot.help((ctx) => ctx.reply("Справка в процессе"))

  bot.launch({
    webhook: {
      domain: process.env.TELEGRAM_WEBHOOK_PATH,
      port: 4000
    }
  })
}

module.exports = start