import {
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
  START_MESSAGE,
} from '../constants/messages'
import type { BotContext } from '../global'
import { escapeMarkdown } from '../helpers/format-list'
import { getTzOffset, upsertUserConfig } from '../persistence/user-config'

const start = async (ctx: BotContext): Promise<void> => {
  if (ctx.from === undefined) {
    await ctx.reply(GENERAL_ERROR_MESSAGE)
    console.error(MISSING_PROPERTIES_ERROR_MESSAGE)
    return
  }
  const tzOffset = await getTzOffset(ctx.from.id)
  if (tzOffset === null) {
    await upsertUserConfig(ctx.from.id)
  }
  await ctx.replyWithMarkdownV2(escapeMarkdown(START_MESSAGE))
}

export default start
