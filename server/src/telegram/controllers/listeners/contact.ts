const repository = require('../../repository');
const { getFullName } = require('../../../utils');
const { isCustomError } = require('../../../utils/customError');
const { mainMenu } = require('../../buttons');

exports.contactHandler = async (ctx) => {
  const { contact } = ctx.update.message

  try {
    const newEmployee = await repository.registrationEmployee(contact)
    ctx.reply(
      `Здравствуйте, ${getFullName(newEmployee)}!`,
      {
        disable_web_page_preview: true,
        parse_mode: 'HTML',
        ...mainMenu
      }
    )
  } catch (error) {
    console.log(error)
    if (isCustomError(error)) ctx.reply(error.message)
    ctx.reply('Упс... что-то пошло не так...')
  }
}
