import type { BotContext } from '../global'
import { getMTDExpenses } from '../persistence/stats'

const stats = async (ctx: BotContext): Promise<void> => {
  console.log(await getMTDExpenses(ctx.from?.id))
  await ctx.reply('hi')
}

export default stats
