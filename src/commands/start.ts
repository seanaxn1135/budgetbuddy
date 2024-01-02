import type { BotContext } from '../global'

const start = async (ctx: BotContext): Promise<void> => {
  const greeting = `Hello! Welcome to the Budget Bot. How can I assist you today?`
  await ctx.reply(greeting)
}

export default start
