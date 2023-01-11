// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('../../repository');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getFullNam... Remove this comment to see the full error message
const { getFullName } = require('../../../utils');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'mainMenu'.
const { mainMenu, noAuthMenu } = require('../../buttons');

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.start = async (ctx: any) => {
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