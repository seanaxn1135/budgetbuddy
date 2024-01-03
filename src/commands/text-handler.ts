import { deunionize } from 'telegraf'
import type { BotContext } from '../global'
import { isValidAmount } from '../helpers/is-valid-amount'
import {
  EXPENSE_MESSAGE,
  INCOME_MESSAGE,
  INVALID_FORMAT_MESSAGE,
} from '../constants/messages'

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
    await ctx.reply(INCOME_MESSAGE)
    await ctx.scene.enter('CATEGORIZE_INCOME')
  } else if (isExpense(text)) {
    await ctx.reply(EXPENSE_MESSAGE)
    await ctx.scene.enter('CATEGORIZE_EXPENSE')
  } else {
    await ctx.reply(INVALID_FORMAT_MESSAGE)
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
