import start from '../start'

describe('start command', () => {
  it('should send a welcome message', async () => {
    const ctx = { reply: jest.fn() }

    await start(ctx as any)

    expect(ctx.reply).toHaveBeenCalledWith(
      'Hello! Welcome to the Budget Bot. How can I assist you today?'
    )
  })
})
