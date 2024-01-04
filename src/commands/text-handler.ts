import { deunionize } from 'telegraf'
import type { BotContext } from '../global'
import { isValidAmount } from '../helpers/is-valid-amount'
import { INVALID_FORMAT_MESSAGE } from '../constants/messages'

const textHandler = async (ctx: BotContext): Promise<void> => {
  ctx.session = {}
  const message = deunionize(ctx.message)
  if (message === null || message === undefined) {
    return
  }

  if (ctx.from === undefined) {
    return
  }

  const text = message.text?.replace(/\s+/g, ' ').trim()
  if (typeof text !== 'string') {
    return
  }

  if (isIncome(text)) {
    const transactionDetails = parseTransactionDetails(text)
    ctx.session.transaction = { ...transactionDetails }
    await ctx.scene.enter('CATEGORIZE_INCOME')
  } else if (isExpense(text)) {
    const transactionDetails = parseTransactionDetails(text)
    ctx.session.transaction = { ...transactionDetails }
    await ctx.scene.enter('CATEGORIZE_EXPENSE')
    console.log(ctx.session)
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

const parseTransactionDetails = (
  input: string
): {
  amount: number
  description: string
} => {
  const detailsArray = input.trim().split(' ')
  const amount = parseFloat(detailsArray[0].replace(/[^\d.]/g, ''))

  const description = detailsArray.slice(1).join(' ')
  return { amount, description }
}

export default textHandler
