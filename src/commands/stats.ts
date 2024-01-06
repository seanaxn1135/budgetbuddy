import type { BotContext } from '../global'

const stats = async (ctx: BotContext): Promise<void> => {
  await ctx.scene.enter('STATS_TIMEFRAME')
}

export default stats
