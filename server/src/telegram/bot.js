class TelegramBot {
  #bot;

  initializeBot(bot) {
    if (!this.#bot) {
      this.#bot = bot;
    }

    return this;
  }

  async sendMessage(chatId, text) {
    if (!this.#bot) throw Error('Telegram bot is not initialized!')

    return this.#bot.telegram.sendMessage(chatId, text);
  }
}

exports.TelegramBot = new TelegramBot;