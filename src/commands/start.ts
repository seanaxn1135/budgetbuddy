import {
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
  START_MESSAGE,
} from '../constants/messages'
import type { BotContext } from '../global'
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
  await ctx.reply(START_MESSAGE)
}

export default start
