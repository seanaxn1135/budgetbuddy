import type { BotContext } from '../global'

const list = async (ctx: BotContext): Promise<void> => {
  await ctx.reply('list')
}

export default list
