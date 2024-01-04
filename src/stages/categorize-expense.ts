import { Scenes, Markup } from 'telegraf'
import type { BotContext } from '../global'
import {
  CATEGORY_EXPENSE_CONFIRMATION,
  CATEGORY_SELECT_PROMPT,
  CATEGORY_SELECT_REMINDER,
} from '../constants/messages'
import { EXPENSE_CATEGORIES } from '../constants/categories'

export const categorizeExpenseScene = new Scenes.BaseScene<BotContext>(
  'CATEGORIZE_EXPENSE'
)

categorizeExpenseScene.enter(async (ctx) => {
  const keyboard = EXPENSE_CATEGORIES.map((category) => [
    Markup.button.callback(category.label, category.callbackData),
  ])
  await ctx.reply(CATEGORY_SELECT_PROMPT, Markup.inlineKeyboard(keyboard))
})

categorizeExpenseScene.action(/^category_(.+)/, async (ctx) => {
  if (ctx.session.transaction == null) {
    await ctx.reply('Something went wrong')
    return
  }
  const category = ctx.match[1]
  await ctx.editMessageText(CATEGORY_EXPENSE_CONFIRMATION(category))
  ctx.session.transaction.category = category
  await ctx.scene.leave()
})

categorizeExpenseScene.use(
  async (ctx) => await ctx.reply(CATEGORY_SELECT_REMINDER)
)
