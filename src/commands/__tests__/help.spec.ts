import { createCtxWithMessage } from './../../test-helper/create-ctx'
import type { BotContext } from '../../global'
import help from '../help'

describe('help command', () => {
  let ctx: BotContext
  it('should send a help message', async () => {
    ctx = createCtxWithMessage('/help')
    await help(ctx)
    expect(ctx.reply).toHaveBeenCalledWith(
      'This bot can help you track your expenses and income. Here are the available commands:'
    )
  })
})
