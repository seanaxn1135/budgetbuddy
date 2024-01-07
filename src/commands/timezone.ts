import type { BotContext } from '../global'

const timezone = async (ctx: BotContext): Promise<void> => {
  await ctx.scene.enter('SELECT_TIMEZONE_ACTION')
}

export default timezone
