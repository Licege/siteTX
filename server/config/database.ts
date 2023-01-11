const defaultDBConfig = {
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  username: process.env.DB_USER || '',
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  password: process.env.DB_PASSWORD || '',
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  database: process.env.DB_NAME,
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 100,
    min: 0,
    idle: 20000,
    acquire: 10000,
    handleDisconnects: true
  }
}

// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = {
  development: defaultDBConfig,
  production: defaultDBConfig
}
