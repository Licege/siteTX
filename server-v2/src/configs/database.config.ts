import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  database: process.env.DB_NAME || 'trixolma-test',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
}));
