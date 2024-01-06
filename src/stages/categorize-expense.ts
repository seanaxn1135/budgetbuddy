import { Scenes, Markup } from 'telegraf'
import type { BotContext } from '../global'
import {
  CATEGORY_EXPENSE_CONFIRMATION,
  CATEGORY_SELECT_PROMPT,
  CATEGORY_SELECT_REMINDER,
} from '../constants/messages'
import { EXPENSE_CATEGORIES } from '../constants/categories'
import insertExpense from '../persistence/expense'

export const categorizeExpenseScene = new Scenes.BaseScene<BotContext>(
  'CATEGORIZE_EXPENSE'
)

categorizeExpenseScene.enter(async (ctx) => {
  const keyboard = Markup.inlineKeyboard(
    EXPENSE_CATEGORIES.map((category) => [
      Markup.button.callback(category.label, category.callbackData),
    ])
  )
  await ctx.reply(CATEGORY_SELECT_PROMPT, keyboard)
})

categorizeExpenseScene.action(/^category_(.+)/, async (ctx) => {
  const date = ctx.callbackQuery?.message?.date
  if (
    ctx.from === undefined ||
    ctx.session.transaction === undefined ||
    date === undefined
  ) {
    await ctx.reply('An error occurred. Please try again.')
    console.error('Error: Required properties are undefined.')
    return
  }

  const category = ctx.match[1]
  await ctx.editMessageText(CATEGORY_EXPENSE_CONFIRMATION(category))
  ctx.session.transaction.category = category
  await ctx.scene.leave()

  await insertExpense(
    ctx.from.id,
    ctx.session.transaction.description,
    ctx.session.transaction.amount,
    ctx.session.transaction.category,
    new Date(date * 1000)
  )
})

categorizeExpenseScene.use(
  async (ctx) => await ctx.reply(CATEGORY_SELECT_REMINDER)
)
