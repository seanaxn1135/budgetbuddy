import { createCtxWithMessage } from './../../test-helper/create-ctx'
import type { BotContext } from '../../global'
import start from '../start'
import { getTzOffset, upsertUserConfig } from '../../persistence/user-config'
import { escapeMarkdown } from '../../helpers/format-list'
import { START_MESSAGE } from '../../constants/messages'

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
    expect(ctx.replyWithMarkdownV2).toHaveBeenCalledWith(
      escapeMarkdown(START_MESSAGE)
    )
  })

  it('should call upsert user config if getTz returns null', async () => {
    ctx = createCtxWithMessage('/start')
    mockedGetTzOffset.mockResolvedValue(null)

    const userId = ctx.from?.id
    if (userId !== null && userId !== undefined) {
      await start(ctx)

      expect(mockedUpsertUserConfig).toHaveBeenCalledWith(userId)
      expect(ctx.replyWithMarkdownV2).toHaveBeenCalledWith(
        escapeMarkdown(START_MESSAGE)
      )
    } else {
      throw new Error('ctx.from is undefined')
    }
  })
})
