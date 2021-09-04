const service = require('./src/servers/service')
const authorization = require('./src/servers/authorization')
const telegram = require('./src/servers/telegram')

const mode = process.env.DEFAULT_EXECUTION_MODE || 'service'

const servers = {
  authorization,
  service,
  telegram
}

module.exports = servers[mode]();