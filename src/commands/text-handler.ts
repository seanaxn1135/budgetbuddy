import { deunionize } from 'telegraf'
import type { BotContext } from '../global'
import { isValidAmount } from '../helpers/is-valid-amount'
import { INVALID_FORMAT_MESSAGE } from '../constants/messages'

const SCENES = {
  CATEGORIZE_INCOME: 'CATEGORIZE_INCOME',
  CATEGORIZE_EXPENSE: 'CATEGORIZE_EXPENSE',
}

const textHandler = async (ctx: BotContext): Promise<void> => {
  ctx.session = {}

  const message = deunionize(ctx.message)
  if (message?.text == null || ctx.from == null) {
    return
  }

  const text = message.text?.replace(/\s+/g, ' ').trim()
  if (typeof text !== 'string') {
    return
  }

  try {
    if (isIncome(text)) {
      await processTransaction(ctx, text, SCENES.CATEGORIZE_INCOME)
    } else if (isExpense(text)) {
      await processTransaction(ctx, text, SCENES.CATEGORIZE_EXPENSE)
    } else {
      await ctx.reply(INVALID_FORMAT_MESSAGE)
    }
  } catch (error) {
    console.error('Error processing text:', error)
  }
}

const processTransaction = async (
  ctx: BotContext,
  text: string,
  command: string
): Promise<void> => {
  const transactionDetails = parseTransactionDetails(text)
  ctx.session.transaction = { ...transactionDetails }
  await ctx.scene.enter(command)
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
): { amount: number; description: string } => {
  const detailsArray = input.trim().split(' ')
  const amount = parseFloat(detailsArray[0].replace(/[^\d.-]/g, ''))

  if (isNaN(amount)) {
    throw new Error('Invalid amount')
  }

  const description = detailsArray.slice(1).join(' ')
  return { amount, description }
}

export default textHandler
