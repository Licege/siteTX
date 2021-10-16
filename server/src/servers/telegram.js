const { Telegraf } = require('telegraf')
const fs = require('fs')
const path = require('path')

// "lt --port 9093 --subdomain trixolma" for work
const start = () => {
  if (!process.env.TELEGRAM_TOKEN) throw new Error('Set telegram token for use bot')
  console.log(process.env.NODE_ENV);

  const bot = new Telegraf(process.env.TELEGRAM_TOKEN)

  bot.use(Telegraf.log())

  bot.help((ctx) => ctx.reply("Справка в процессе"))

  bot.launch({
    webhook: {
      domain: process.env.TELEGRAM_WEBHOOK_PATH,
      port: process.env.TELEGRAM_BOT_PORT,
      tlsOptions: getTLS()
    }
  })
}

const pathToCert = path.resolve(__dirname, '../../certificates/')

function getTLS() {
  if (process.env.NODE_ENV !== 'production') return undefined;

  return {
    key: fs.readFileSync(path.resolve(pathToCert, 'privkey.pem')),
    cert: fs.readFileSync(path.resolve(pathToCert, 'cert.pem'))
  }
}

module.exports = start