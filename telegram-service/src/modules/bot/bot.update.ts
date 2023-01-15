import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly botService: BotService,
  ) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('работаю!');
  }

  @Hears(/тест/)
  async testListener(ctx: Context) {
    await ctx.reply('работаю!');
  }
}
