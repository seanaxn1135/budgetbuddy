import { Markup, Scenes } from 'telegraf'
import type { BotContext } from '../global'
import { STATS_TIMEFRAME } from '../constants/stats-timeframe'
import {
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
  STATS_TIMEFRAME_PROMPT,
  TIMEFRAME_SELECT_REMINDER,
} from '../constants/messages'
import { getLocalMTDInUTC } from '../helpers/timezone'
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
  await ctx.reply(STATS_TIMEFRAME_PROMPT, Markup.inlineKeyboard(keyboard))
})

statsTimeframeScene.action('timeframe_mtd', async (ctx) => {
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

  const fromDate = getLocalMTDInUTC(tzOffset)
  const toDate = moment.utc()
  const [income, expenses] = await Promise.all([
    getIncome(ctx.from.id, fromDate, toDate) as Transaction[],
    getExpenses(ctx.from.id, fromDate, toDate) as Transaction[],
  ])
  await ctx.replyWithMarkdownV2(formatStats(expenses, income))

  await ctx.scene.leave()
})

statsTimeframeScene.action('timeframe_last_month', async (ctx) => {
  await ctx.editMessageText('last_month')
  await ctx.scene.leave()
})

statsTimeframeScene.action('timeframe_ytd', async (ctx) => {
  await ctx.editMessageText('ytd')
  await ctx.scene.leave()
})

statsTimeframeScene.action('timeframe_last_year', async (ctx) => {
  await ctx.editMessageText('last_year')
  await ctx.scene.leave()
})

statsTimeframeScene.use(
  async (ctx) => await ctx.reply(TIMEFRAME_SELECT_REMINDER)
)
