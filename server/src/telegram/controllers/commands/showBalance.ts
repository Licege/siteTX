import * as repository from '../../repository';

export const showBalance = async (ctx: any) => {
  try {
    const { from } = ctx.update.message

    const currentUser = await repository.getRegisteredEmployee(from.id);

    ctx.reply(`Ваш баланс: ${currentUser.balance} ₽.`)
  } catch (error) {
    console.log(error);
    ctx.reply('Упс... что-то пошло не так...')
  }
}