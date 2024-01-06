import type { BotContext } from '../global'

const stats = async (ctx: BotContext): Promise<void> => {
  await ctx.reply('hi')
}

export default stats
