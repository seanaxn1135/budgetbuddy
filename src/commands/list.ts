import type { BotContext } from '../global'

const list = async (ctx: BotContext): Promise<void> => {
  await ctx.scene.enter('LIST_TIMEFRAME')
}

export default list
