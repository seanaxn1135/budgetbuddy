import { Markup, Scenes } from 'telegraf'
import type { BotContext } from '../global'
import {
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
  TIMEFRAME_PROMPT,
} from '../constants/messages'
import { LIST_TIMEFRAME } from '../constants/list-timeframe'
import { getTzOffset } from '../persistence/user-config'
import {
  getStartOfLastMonthInUTC,
  getStartOfThisMonthInUTC,
} from '../helpers/timezone'
import moment from 'moment'
import { getExpenses, getIncome } from '../persistence/fetch'
import type { Transaction } from '../entities/transaction'
import formatDate from '../helpers/format-date'
import { combineAndFormatLists } from '../helpers/format-list'

export const listTimeframeScene = new Scenes.BaseScene<BotContext>(
  'LIST_TIMEFRAME'
)

listTimeframeScene.enter(async (ctx) => {
  const keyboard = LIST_TIMEFRAME.map((timeframe) => [
    Markup.button.callback(timeframe.label, timeframe.callbackData),
  ])
  await ctx.replyWithMarkdownV2(
    TIMEFRAME_PROMPT,
    Markup.inlineKeyboard(keyboard)
  )
})

listTimeframeScene.action('timeframe_mtd', async (ctx) => {
  await generateList(ctx, 'MTD')
})

listTimeframeScene.action('timeframe_last_month', async (ctx) => {
  await generateList(ctx, 'LAST_MONTH')
})

async function generateList(
  ctx: BotContext,
  timeframe: 'MTD' | 'LAST_MONTH'
): Promise<void> {
  if (ctx.from === undefined) {
    await ctx.reply(GENERAL_ERROR_MESSAGE)
    console.error(MISSING_PROPERTIES_ERROR_MESSAGE)
    return
  }
  const tzOffset = await getTzOffset(ctx.from.id)

  if (tzOffset === null) {
    await ctx.reply(GENERAL_ERROR_MESSAGE)
    console.error('Error: Timezone offset not found')
    return
  }

  let fromDate
  let toDate
  switch (timeframe) {
    case 'MTD':
      fromDate = getStartOfThisMonthInUTC(tzOffset)
      toDate = moment.utc()
      break
    case 'LAST_MONTH':
      fromDate = getStartOfLastMonthInUTC(tzOffset)
      toDate = getStartOfThisMonthInUTC(tzOffset).subtract(1, 'millisecond')
      break
    default:
      throw new Error(`Unsupported timeframe: ${timeframe as string}`)
  }
  const [income, expenses] = await Promise.all([
    getIncome(ctx.from.id, fromDate, toDate) as Transaction[],
    getExpenses(ctx.from.id, fromDate, toDate) as Transaction[],
  ])
  await ctx.editMessageText(
    `List for *${formatDate(fromDate, tzOffset)} — ${formatDate(
      toDate,
      tzOffset
    )}:*`,
    {
      parse_mode: 'MarkdownV2',
    }
  )
  await ctx.replyWithMarkdownV2(combineAndFormatLists(expenses, income))
  await ctx.scene.leave()
}
