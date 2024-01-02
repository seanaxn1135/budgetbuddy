import dotenv from 'dotenv'
import start from './commands/start'
import test from './commands/test'
import { Scenes, Telegraf, session } from 'telegraf'
import type { BotContext } from './global'
import { scenes } from './stages'

dotenv.config()

if (process.env.BOT_TOKEN === undefined || process.env.BOT_TOKEN === '') {
  throw new Error('BOT_TOKEN not found in environment variables.')
}

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN)

async function startBot(): Promise<void> {
  bot.use(session())
  const stage = new Scenes.Stage(scenes)
  bot.use(stage.middleware())
  bot.start(start)
  bot.command('test', test)
  await bot.launch()
}

void startBot()
