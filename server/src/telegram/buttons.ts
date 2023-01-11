const { Markup } = require('telegraf');
const { CMD_TEXT } = require('./config/constants');

const noAuthMenu = Markup.keyboard([
  Markup.button.contactRequest('Войти по номеру телефона')
]).resize(false)

const mainMenu = Markup.keyboard([
  [CMD_TEXT.Balance]
]).resize();

module.exports = {
  noAuthMenu,
  mainMenu
}