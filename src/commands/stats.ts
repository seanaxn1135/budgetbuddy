import type { BotContext } from '../global'
import { getExpenses } from '../persistence/stats'

const stats = async (ctx: BotContext): Promise<void> => {
  const today = new Date() // Get today's date
  const startOfDay = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0
    )
  ) // Start of today in UTC
  const endOfDay = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      23,
      59,
      59
    )
  ) // End of today in UTC
  console.log(await getExpenses(ctx.from?.id, startOfDay, endOfDay))

  await ctx.reply('hi')
  await ctx.scene.enter('STATS_TIMEFRAME')
}

export default stats
