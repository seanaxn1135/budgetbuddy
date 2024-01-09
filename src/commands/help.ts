import { HELP_MESSAGE } from '../constants/messages'
import type { BotContext } from '../global'
import { escapeMarkdown } from '../helpers/format-list'

const help = async (ctx: BotContext): Promise<void> => {
  await ctx.replyWithMarkdownV2(escapeMarkdown(HELP_MESSAGE))
}

export default help
