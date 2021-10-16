const { dictionary } = require('./dictionary');

exports.commands = bot => {
  bot.help((ctx) => ctx.reply(dictionary.commands))

  bot.on("message", async ctx => {
    const msg = ctx.message.text;

    ctx.reply(msg);
  })
}