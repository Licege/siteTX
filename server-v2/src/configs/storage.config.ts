import { registerAs } from '@nestjs/config';

export const storageConfig = registerAs('storage', () => ({
  url: process.env.STORAGE_URL,
}));
