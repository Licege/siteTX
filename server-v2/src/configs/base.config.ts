export const baseConfig = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.DB_PORT, 10) || 3000,
  clientUrl: process.env.CLIENT_URL,
});
