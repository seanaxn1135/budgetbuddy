import {
  DELETE_MESSAGE,
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
  NO_RECORD_TO_DELETE,
} from '../constants/messages'
import type { BotContext } from '../global'
import { delete_last_transaction } from '../persistence/delete'

const deleteLastEntry = async (ctx: BotContext): Promise<void> => {
  try {
    if (ctx.from === undefined) {
      await ctx.reply(GENERAL_ERROR_MESSAGE)
      console.error(MISSING_PROPERTIES_ERROR_MESSAGE)
      return
    }

    const latestRecord = await delete_last_transaction(ctx.from.id)

    if (latestRecord === null || latestRecord === undefined) {
      await ctx.reply(NO_RECORD_TO_DELETE)
      return
    }

    const latestRecordString = `$${latestRecord.amount} ${latestRecord.description}`
    await ctx.replyWithMarkdownV2(DELETE_MESSAGE(latestRecordString))
  } catch (error) {
    console.error('Error in deleteLastEntry:', error)
    await ctx.reply(GENERAL_ERROR_MESSAGE)
  }
}

export default deleteLastEntry
