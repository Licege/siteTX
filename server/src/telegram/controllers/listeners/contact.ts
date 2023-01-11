// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'repository... Remove this comment to see the full error message
const repository = require('../../repository');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'getFullNam... Remove this comment to see the full error message
const { getFullName } = require('../../../utils');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { isCustomError } = require('../../../utils/customError');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'mainMenu'.
const { mainMenu } = require('../../buttons');

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.contactHandler = async (ctx: any) => {
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
    // @ts-expect-error TS(2571): Object is of type 'unknown'.
    if (isCustomError(error)) ctx.reply(error.message)
    ctx.reply('Упс... что-то пошло не так...')
  }
}
