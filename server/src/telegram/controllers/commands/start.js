const repository = require('../../repository');
const { getFullName } = require('../../../utils');
const { mainMenu, noAuthMenu } = require('../../buttons');

exports.start = async (ctx) => {
  try {
    const { id: chatId } = ctx.update.message.from

    const employee = await repository.getRegisteredEmployee(chatId)

    if (!employee) {
      ctx.reply(
        'Авторизуйтесь по номеру телефона',
        {
          disable_web_page_preview: true,
          parse_mode: 'HTML',
          ...noAuthMenu
        }
      )
    } else {
      ctx.reply(
        `Здравствуйте, ${getFullName(employee)}!`,
        {
          disable_web_page_preview: true,
          parse_mode: 'HTML',
          ...mainMenu
        }
      )
    }
  } catch (error) {
    console.log(error);
    ctx.reply('Упс... что-то пошло не так...')
  }
}