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

export const telegramBot = new TelegramBot();
