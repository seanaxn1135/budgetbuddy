import type { BotContext } from '../global'

const test = async (ctx: BotContext): Promise<void> => {
  await ctx.scene.enter('CATEGORIZE_EXPENSE')
}

export default test
