import dotenv from 'dotenv'
import { Telegraf } from 'telegraf'

dotenv.config()

if (
  process.env.BOT_TOKEN === undefined ||
  process.env.BOT_TOKEN.trim() === ''
) {
  throw new Error('BOT_TOKEN not found in environment variables.')
}

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start(async (ctx): Promise<void> => {
  await ctx.reply('Hello World')
})

async function startBot(): Promise<void> {
  try {
    await bot.launch()
    console.log('Bot started successfully')
  } catch (error) {
    console.error('Failed to start the bot', error)
  }
}

void startBot()
