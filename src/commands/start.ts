import type { Context } from 'telegraf'

const start = async (ctx: Context): Promise<void> => {
  const greeting = `Hello! Welcome to the Budget Bot. How can I assist you today?`
  await ctx.reply(greeting)
}

export default start
