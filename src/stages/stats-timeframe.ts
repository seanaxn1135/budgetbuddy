import { Markup, Scenes } from 'telegraf'
import type { BotContext } from '../global'
import { STATS_TIMEFRAME } from '../constants/stats-timeframe'
import { STATS_TIMEFRAME_PROMPT } from '../constants/messages'

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
  await ctx.editMessageText('mtd')
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
