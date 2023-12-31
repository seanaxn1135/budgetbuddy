import { INVALID_FORMAT_MESSAGE } from '../../constants/messages'
import type { BotContext } from '../../global'
import { createCtxWithMessage } from '../../test-helper/create-ctx'
import textHandler from '../text-handler'

describe('Text Handler', () => {
  let ctx: BotContext

  it('should identify income', async () => {
    ctx = createCtxWithMessage('+1000 Salary')
    await textHandler(ctx)
    expect(ctx.session.transaction).toEqual({
      amount: 1000,
      description: 'Salary',
      category: undefined,
    })
    expect(ctx.scene.enter).toHaveBeenCalledWith('CATEGORIZE_INCOME')
  })

  it('should identify expense', async () => {
    ctx = createCtxWithMessage('2000 Rent')
    await textHandler(ctx)
    expect(ctx.session.transaction).toEqual({
      amount: 2000,
      description: 'Rent',
      category: undefined,
    })
    expect(ctx.scene.enter).toHaveBeenCalledWith('CATEGORIZE_EXPENSE')
  })

  it('should handle invalid format', async () => {
    ctx = createCtxWithMessage('Invalid Text')
    await textHandler(ctx)
    expect(ctx.reply).toHaveBeenCalledWith(INVALID_FORMAT_MESSAGE)
  })
})
