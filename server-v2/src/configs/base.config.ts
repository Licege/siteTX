export const baseConfig = () => ({
  port: parseInt(process.env.DB_PORT, 10) || 3000,
  clientUrl: process.env.CLIENT_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'SECRET-SECRET-AC',
  jwtRefreshSecret: process.env.JWT_ACCESS_SECRET || 'SECRET-SECRET-RF',
  jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '60d',
});
