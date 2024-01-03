import type { BotContext } from '../../global'
import textHandler from '../text-handler'

describe('Text Handler', () => {
  let ctx: BotContext
  const createCtxWithMessage = (text: string): BotContext =>
    ({
      message: {
        text,
      },
      reply: jest.fn(),
    }) as unknown as BotContext

  it('should identify income', async () => {
    ctx = createCtxWithMessage('+1000 Salary')
    await textHandler(ctx)
    expect(ctx.reply).toHaveBeenCalledWith('This is income')
  })

  it('should identify expense', async () => {
    ctx = createCtxWithMessage('2000 Rent')
    await textHandler(ctx)
    expect(ctx.reply).toHaveBeenCalledWith('This is expense')
  })

  it('should reply "I do not understand" if text is not valid', async () => {
    ctx = createCtxWithMessage('Invalid Text')
    await textHandler(ctx)
    expect(ctx.reply).toHaveBeenCalledWith('I do not understand')
  })
})
