import type { BotContext } from '../../global'
import start from '../start'

describe('start command', () => {
  it('should send a welcome message', async () => {
    const ctx = { reply: jest.fn() } as unknown as BotContext

    await start(ctx)
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(ctx.reply).toHaveBeenCalledWith(
      'Hello! Welcome to the Budget Bot. How can I assist you today?'
    )
  })
})
