import { deunionize } from 'telegraf'
import type { BotContext } from '../global'
import { isValidAmount } from '../helpers/is-valid-amount'

const textHandler = async (ctx: BotContext): Promise<void> => {
  const message = deunionize(ctx.message)
  if (message === null || message === undefined) {
    return
  }

  const text = message.text?.replace(/\s+/g, ' ').trim()
  if (typeof text !== 'string') {
    return
  }

  if (isIncome(text)) {
    await ctx.reply('This is income')
  } else if (isExpense(text)) {
    await ctx.reply('This is expense')
  } else {
    await ctx.reply('I do not understand')
  }
}

const extractAmount = (text: string): string => text.split(' ')[0]

const isIncome = (text: string): boolean => {
  const amount = extractAmount(text)
  return amount.startsWith('+') && isValidAmount(amount.substring(1))
}

const isExpense = (text: string): boolean => {
  const amount = extractAmount(text)
  return !amount.startsWith('+') && isValidAmount(amount)
}

export default textHandler
