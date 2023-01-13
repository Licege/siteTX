import authorization from './src/servers/authorization';
import service from './src/servers/service';
import telegram from './src/servers/telegram';

const mode = process.env.DEFAULT_EXECUTION_MODE || 'service'

const servers = {
  authorization,
  service,
  telegram
}

// @ts-ignore
export default servers[mode]()
