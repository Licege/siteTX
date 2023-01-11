// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const { Markup } = require('telegraf');
// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'CMD_TEXT'.
const { CMD_TEXT } = require('./config/constants');

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'noAuthMenu... Remove this comment to see the full error message
const noAuthMenu = Markup.keyboard([
  Markup.button.contactRequest('Войти по номеру телефона')
]).resize(false)

// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'mainMenu'.
const mainMenu = Markup.keyboard([
  [CMD_TEXT.Balance]
]).resize();

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  noAuthMenu,
  mainMenu
}