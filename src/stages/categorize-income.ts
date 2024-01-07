import { Scenes, Markup } from 'telegraf'
import type { BotContext } from '../global'
import {
  CATEGORY_INCOME_CONFIRMATION,
  CATEGORY_SELECT_PROMPT,
  CATEGORY_SELECT_REMINDER,
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
} from '../constants/messages'
import { INCOME_CATEGORIES } from '../constants/categories'
import insertIncome from '../persistence/income'

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
  const date = ctx.callbackQuery?.message?.date
  if (
    ctx.from === undefined ||
    ctx.session.transaction === undefined ||
    date === undefined
  ) {
    await ctx.reply(GENERAL_ERROR_MESSAGE)
    console.error(MISSING_PROPERTIES_ERROR_MESSAGE)
    return
  }

  const category = ctx.match[1]
  await ctx.editMessageText(CATEGORY_INCOME_CONFIRMATION(category))
  ctx.session.transaction.category = category
  await ctx.scene.leave()

  await insertIncome(
    ctx.from.id,
    ctx.session.transaction.description,
    ctx.session.transaction.amount,
    ctx.session.transaction.category,
    new Date(date * 1000)
  )
})

categorizeIncomeScene.use(
  async (ctx) => await ctx.reply(CATEGORY_SELECT_REMINDER)
)
