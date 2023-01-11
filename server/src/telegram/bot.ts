// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'TelegramBo... Remove this comment to see the full error message
class TelegramBot {
  // @ts-expect-error TS(7008): Member '#bot' implicitly has an 'any' type.
  #bot;

  initializeBot(bot: any) {
    if (!this.#bot) {
      this.#bot = bot;
    }

    return this;
  }

  async sendMessage(chatId: any, text: any) {
    if (!this.#bot) throw Error('Telegram bot is not initialized!')

    return this.#bot.telegram.sendMessage(chatId, text);
  }
}

// @ts-expect-error TS(2304): Cannot find name 'exports'.
exports.TelegramBot = new TelegramBot;