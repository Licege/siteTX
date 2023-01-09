const { Markup } = require('telegraf')
const { dictionary } = require('./dictionary')
const repository = require('./repository')
const { getFullName } = require('../utils')
const { isCustomError } = require('../utils/customError')

async function startHandler(ctx) {
  const telegramChatId = ctx.update.message.from.id

  const employee = await repository.getRegisteredEmployee(telegramChatId)

  if (!employee) {
    ctx.reply(
      'Авторизуйтесь по номеру телефона',
      Markup.keyboard([
        Markup.button.contactRequest('Войти по номеру телефона')
      ]).resize(false)
    )
  } else {
    ctx.reply(
      `Здравствуйте, ${getFullName(employee)}!`,
      Markup.removeKeyboard()
    )
  }
}

exports.commands = (bot) => {
  bot.command('start', startHandler)
  bot.help((ctx) => ctx.reply(dictionary.commands))

  bot.on('contact', async (ctx) => {
    const { contact } = ctx.update.message

    try {
      const newEmployee = await repository.registrationEmployee(contact)
      ctx.reply(
        `Здравствуйте, ${getFullName(newEmployee)}!`,
        Markup.removeKeyboard()
      )
    } catch (err) {
      if (isCustomError(err)) ctx.reply(err.message)
      console.log(err)
    }
  })

  bot.on('message', async (ctx) => {
    const msg = ctx.message.text

    if (msg) {
      ctx.reply(msg)
    }
  })

  bot.on()
}
