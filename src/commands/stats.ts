import type { BotContext } from '../global'
import { getExpenses } from '../persistence/stats'

const stats = async (ctx: BotContext): Promise<void> => {
  const today = new Date() // Get today's date
  const startOfDay = new Date(today) // Start of today in UTC
  const endOfDay = new Date(today) // Start of today in UTC
  startOfDay.setHours(0, 0, 0, 0)
  endOfDay.setHours(23, 59, 59, 999)
  console.log(await getExpenses(ctx.from?.id, startOfDay, endOfDay))
  await ctx.scene.enter('STATS_TIMEFRAME')
}

export default stats
