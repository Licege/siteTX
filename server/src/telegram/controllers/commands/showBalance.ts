// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('../../repository')

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.showBalance = async (ctx: any) => {
  try {
    const { from } = ctx.update.message

    const currentUser = await repository.getRegisteredEmployee(from.id);

    ctx.reply(`Ваш баланс: ${currentUser.balance} ₽.`)
  } catch (error) {
    console.log(error);
    ctx.reply('Упс... что-то пошло не так...')
  }
}