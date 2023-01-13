import * as repository from '../../repository';
import { getFullName } from '../../../utils';
import { CustomError } from '../../../utils/customError';
import { mainMenu } from '../../buttons';

export const contactHandler = async (ctx: any) => {
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
    if (error instanceof CustomError) ctx.reply(error.message)
    ctx.reply('Упс... что-то пошло не так...')
  }
}
