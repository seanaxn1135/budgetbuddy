import type { BotContext } from '../../global'
import textHandler from '../text-handler'

describe('Text Handler', () => {
  let ctx: BotContext
  const createCtxWithMessage = (text: string): BotContext =>
    ({
      message: {
        from: { id: 1 },
        date: 123456,
        text,
      },
      reply: jest.fn(),
    }) as unknown as BotContext
  it('should reply "I do not understand" if text is not valid', async () => {
    ctx = createCtxWithMessage('Some Text')
    await textHandler(ctx)
    expect(ctx.reply).toHaveBeenCalledWith('I do not understand')
  })
})
