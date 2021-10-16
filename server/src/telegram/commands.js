const { Markup } = require('telegraf');
const { dictionary } = require('./dictionary');
const repository = require('./repository');

async function startHandler(ctx) {
  const telegramChatId = ctx.update.message.from.id;

  // Должна быть проверка, есть ли пользователь с таким id в базе
  const isUserExist = await repository.isEmployeeRegistered(telegramChatId);

  if (!isUserExist) {
    ctx.reply('Авторизуйтесь по номеру телефона', Markup.keyboard([
      Markup.button.contactRequest("Войти по номеру телефона")
    ]).resize(false));
  } else {
    ctx.reply('Здравствуйте', Markup.removeKeyboard())
  }
}

exports.commands = bot => {
  bot.command("start", startHandler)
  bot.help((ctx) => ctx.reply(dictionary.commands))

  bot.on('contact', ctx => {
    console.log('contact', ctx.update.message.contact)
  })

  bot.on("message", async ctx => {
    const msg = ctx.message.text;

    if (msg) {
      ctx.reply(msg);
    }
  })

  bot.on()
}