import { Markup, Scenes } from 'telegraf'
import type { BotContext } from '../global'
import { STATS_TIMEFRAME } from '../constants/stats-timeframe'
import {
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
  STATS_TIMEFRAME_PROMPT,
  TIMEFRAME_SELECT_REMINDER,
} from '../constants/messages'
import {
  getStartOfThisMonthInUTC,
  getStartOfThisYearInUTC,
} from '../helpers/timezone'
import { getExpenses, getIncome } from '../persistence/stats'
import { formatStats } from '../helpers/format-text'
import moment from 'moment'
import type { Transaction } from '../entities/transaction'
import { getTzOffset } from '../persistence/user-config'

export const statsTimeframeScene = new Scenes.BaseScene<BotContext>(
  'STATS_TIMEFRAME'
)

statsTimeframeScene.enter(async (ctx) => {
  const keyboard = STATS_TIMEFRAME.map((timeframe) => [
    Markup.button.callback(timeframe.label, timeframe.callbackData),
  ])
  await ctx.replyWithMarkdownV2(
    STATS_TIMEFRAME_PROMPT,
    Markup.inlineKeyboard(keyboard)
  )
})

statsTimeframeScene.action('timeframe_mtd', async (ctx) => {
  await generateStats(ctx, 'MTD')
})

statsTimeframeScene.action('timeframe_last_month', async (ctx) => {
  await ctx.editMessageText('last_month')
  await ctx.scene.leave()
})

statsTimeframeScene.action('timeframe_ytd', async (ctx) => {
  await generateStats(ctx, 'YTD')
})

statsTimeframeScene.action('timeframe_last_year', async (ctx) => {
  await ctx.editMessageText('last_year')
  await ctx.scene.leave()
})

statsTimeframeScene.use(
  async (ctx) => await ctx.reply(TIMEFRAME_SELECT_REMINDER)
)

async function generateStats(
  ctx: BotContext,
  timeframe: 'YTD' | 'MTD' | 'LAST_MONTH' | 'LAST_YEAR'
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
    case 'YTD':
      fromDate = getStartOfThisYearInUTC(tzOffset)
      toDate = moment.utc()
      break
    case 'MTD':
      fromDate = getStartOfThisMonthInUTC(tzOffset)
      toDate = moment.utc()
      break
    case 'LAST_MONTH':
      // TODO: implement
      break
    case 'LAST_YEAR':
      // TODO: implement
      break
    default:
      throw new Error(`Unsupported timeframe: ${timeframe as string}`)
  }
  const [income, expenses] = await Promise.all([
    getIncome(ctx.from.id, fromDate, toDate) as Transaction[],
    getExpenses(ctx.from.id, fromDate, toDate) as Transaction[],
  ])
  await ctx.editMessageText(formatStats(expenses, income), {
    parse_mode: 'MarkdownV2',
  })
  await ctx.scene.leave()
}
