import dotenv from 'dotenv'
import start from './commands/start'
import { Scenes, Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import type { BotContext } from './global'
import { scenes } from './stages'
import textHandler from './commands/text-handler'
import stats from './commands/stats'
import timezone from './commands/timezone'
import list from './commands/list'
import { COMMANDS } from './constants/commands'
import help from './commands/help'
import deleteLastEntry from './commands/delete'

dotenv.config()

if (process.env.BOT_TOKEN === undefined || process.env.BOT_TOKEN === '') {
  throw new Error('BOT_TOKEN not found in environment variables.')
}

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN)
const DOMAIN = 'budgetbuddydev-development.up.railway.app'

async function startBot(): Promise<void> {
  bot.use(session())
  const stage = new Scenes.Stage<BotContext>(scenes)
  bot.use(stage.middleware())

  await bot.telegram.setMyCommands(COMMANDS)

  bot.start(start)
  bot.command('help', help)
  bot.command('list', list)
  bot.command('stats', stats)
  bot.command('delete', deleteLastEntry)
  bot.command('timezone', timezone)
  bot.on(message('text'), textHandler)

  const webhookOptions = {
    webhook: {
      domain: DOMAIN,
      port: 3000,
    },
  }
  const response = await bot.telegram.setWebhook(DOMAIN)
  console.log(response)
  await bot.launch(webhookOptions)
}

void startBot()
