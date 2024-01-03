import { Scenes, Markup } from 'telegraf'
import type { BotContext } from '../global'
import {
  CATEGORY_INCOME_CONFIRMATION,
  CATEGORY_SELECT_PROMPT,
  CATEGORY_SELECT_REMINDER,
} from '../constants/messages'
import { INCOME_CATEGORIES } from '../constants/categories'

export const categorizeIncomeScene = new Scenes.BaseScene<BotContext>(
  'CATEGORIZE_INCOME'
)

categorizeIncomeScene.enter(async (ctx) => {
  const keyboard = INCOME_CATEGORIES.map((category) => [
    Markup.button.callback(category.label, category.callbackData),
  ])
  await ctx.reply(CATEGORY_SELECT_PROMPT, Markup.inlineKeyboard(keyboard))
})

categorizeIncomeScene.action(/^category_(.+)/, async (ctx) => {
  const category = ctx.match[1]
  await ctx.editMessageText(CATEGORY_INCOME_CONFIRMATION(category))
  await ctx.scene.leave()
})

categorizeIncomeScene.use(
  async (ctx) => await ctx.reply(CATEGORY_SELECT_REMINDER)
)
