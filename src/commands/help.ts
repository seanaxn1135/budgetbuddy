import { HELP_MESSAGE } from '../constants/messages'
import type { BotContext } from '../global'

const help = async (ctx: BotContext): Promise<void> => {
  await ctx.reply(HELP_MESSAGE)
}

export default help
