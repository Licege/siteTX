const fs = require('fs')
const path = require('path')

const loadEnvFile = () => {
  const envPath = path.join(__dirname, '../.env')
  if (!fs.existsSync(envPath)) return

  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return

      const separatorIndex = trimmed.indexOf('=')
      if (separatorIndex === -1) return

      const key = trimmed.slice(0, separatorIndex).trim()
      const value = trimmed.slice(separatorIndex + 1).trim()
      if (process.env[key] === undefined) {
        process.env[key] = value
      }
    })
}

loadEnvFile()

const defaultDBConfig = {
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
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

module.exports = {
  development: defaultDBConfig,
  production: defaultDBConfig
}
