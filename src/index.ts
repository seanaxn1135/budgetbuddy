require('dotenv').config()
import { Telegraf } from 'telegraf'

if (!process.env.BOT_TOKEN)
  throw new Error('TELEGRAM_TOKEN not found in environment variables.')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply('Hello World'))

bot.launch()
