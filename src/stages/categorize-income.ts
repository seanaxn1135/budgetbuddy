import { Scenes, Markup } from 'telegraf'
import type { BotContext } from '../global'

export const categorizeIncomeScene = new Scenes.BaseScene<BotContext>(
  'CATEGORIZE_INCOME'
)

categorizeIncomeScene.enter(async (ctx) => {
  await ctx.reply(
    'Please select a category:',
    Markup.inlineKeyboard([
      [Markup.button.callback('Salary', 'category_salary')],
      [Markup.button.callback('Bonus', 'category_bonus')],
    ])
  )
})

categorizeIncomeScene.action(/^category_(.+)/, async (ctx) => {
  const category = ctx.match[1]
  await ctx.reply(`Category ${category} selected. Income saved.`)
  await ctx.scene.leave()
})

categorizeIncomeScene.use(
  async (ctx) => await ctx.reply('Please choose a category')
)
