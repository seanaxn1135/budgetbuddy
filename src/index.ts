import dotenv from 'dotenv'
import start from './commands/start'
import { Scenes, Telegraf, session } from 'telegraf'
import { message } from 'telegraf/filters'
import type { BotContext } from './global'
import { scenes } from './stages'
import textHandler from './commands/text-handler'

dotenv.config()

if (process.env.BOT_TOKEN === undefined || process.env.BOT_TOKEN === '') {
  throw new Error('BOT_TOKEN not found in environment variables.')
}

const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN)

async function startBot(): Promise<void> {
  bot.use(session())
  const stage = new Scenes.Stage<BotContext>(scenes)
  bot.use(stage.middleware())
  bot.start(start)
  bot.on(message('text'), textHandler)
  await bot.launch()
}

void startBot()
