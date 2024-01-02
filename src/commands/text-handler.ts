import { deunionize } from 'telegraf'
import type { BotContext } from '../global'

const textHandler = async (ctx: BotContext): Promise<void> => {
  const message = deunionize(ctx.message)
  if (message === null || message === undefined) {
    return
  }

  const text = message.text
  if (typeof text !== 'string') {
    return
  }

  if (isInvalidMessage(text)) {
    await ctx.reply('I do not understand')
  }
}

const isInvalidMessage = (text: string): boolean => {
  const split = text.split(' ')
  return split.length !== 2
}

export default textHandler
