import { createCtxWithMessage } from './../../test-helper/create-ctx'
import type { BotContext } from '../../global'
import start from '../start'
import { getTzOffset, upsertUserConfig } from '../../persistence/user-config'

jest.mock('../../persistence/user-config')
const mockedGetTzOffset = jest.mocked(getTzOffset)
const mockedUpsertUserConfig = jest.mocked(upsertUserConfig)

describe('start command', () => {
  let ctx: BotContext
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should send a welcome message', async () => {
    ctx = createCtxWithMessage('/start')
    mockedGetTzOffset.mockResolvedValue(1)
    await start(ctx)
    expect(ctx.reply).toHaveBeenCalledWith(
      'Hello! Welcome to the Budget Bot. How can I assist you today?'
    )
  })

  it('should call upsert user config if getTz returns null', async () => {
    ctx = createCtxWithMessage('/start')
    mockedGetTzOffset.mockResolvedValue(null)

    const userId = ctx.from?.id
    if (userId !== null && userId !== undefined) {
      await start(ctx)

      expect(mockedUpsertUserConfig).toHaveBeenCalledWith(userId)
      expect(ctx.reply).toHaveBeenCalledWith(
        'Hello! Welcome to the Budget Bot. How can I assist you today?'
      )
    } else {
      // Fail the test if ctx.from is not defined
      throw new Error('ctx.from is undefined')
    }
  })
})
