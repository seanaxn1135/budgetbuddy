import { Scenes, Markup } from 'telegraf'
import type { BotContext } from '../global'

export const categorizeExpenseScene = new Scenes.BaseScene<BotContext>(
  'CATEGORIZE_EXPENSE'
)

categorizeExpenseScene.enter(async (ctx) => {
  await ctx.reply(
    'Please select a category:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Food', 'category_food')],
      [Markup.button.callback('Transport', 'category_transport')],
    ])
  )
})

categorizeExpenseScene.action(/^category_(.+)/, async (ctx) => {
  const category = ctx.match[1]
  await ctx.reply(`Category ${category} selected. Expense saved.`)
  await ctx.scene.leave()
})

categorizeExpenseScene.use(
  async (ctx) => await ctx.reply('Please choose a category')
)
