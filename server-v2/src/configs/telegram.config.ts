import { registerAs } from '@nestjs/config';

export const telegramConfig = registerAs('telegram', () => {
  const host = process.env.TELEGRAM_HOST || 'localhost';
  const port = process.env.TELEGRAM_PORT || '9095';

  const broker = `${host}:${port}`;

  return {
    broker,
  };
});
