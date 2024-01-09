import type { BotContext } from '../global'

export const createCtxWithMessage = (text: string): BotContext =>
  ({
    from: {
      id: 1,
    },
    message: {
      text,
    },
    scene: {
      enter: jest.fn(),
    },
    reply: jest.fn(),
    replyWithMarkdownV2: jest.fn(),
    session: {
      transaction: {
        amount: 0,
        description: '',
        category: undefined,
      },
    },
  }) as unknown as BotContext
