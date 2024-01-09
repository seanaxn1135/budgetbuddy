import deleteLastEntry from '../delete'
import { delete_last_transaction } from '../../persistence/delete'
import type { BotContext } from '../../global'

jest.mock('../../persistence/delete', () => ({
  delete_last_transaction: jest.fn(),
}))

describe('deleteLastEntry', () => {
  it('calls delete_last_transaction and replies correctly', async () => {
    const mockCtx: Partial<BotContext> = {
      from: {
        id: 12345,
        is_bot: false,
        first_name: 'TestUser',
      },
      reply: jest.fn(),
      replyWithMarkdownV2: jest.fn(),
    }

    const mockLatestRecord = {
      amount: 200,
      description: 'hello',
    }

    ;(delete_last_transaction as jest.Mock).mockResolvedValue(mockLatestRecord)

    await deleteLastEntry(mockCtx as BotContext)

    expect(delete_last_transaction).toHaveBeenCalledWith(12345)

    const expectedMessage = `Your latest record *$${mockLatestRecord.amount} ${mockLatestRecord.description}* has been deleted.`
    expect(mockCtx.replyWithMarkdownV2).toHaveBeenCalledWith(expectedMessage)
  })

  it('handles the case where there is no latest record', async () => {
    const mockCtx: Partial<BotContext> = {
      from: {
        id: 12345,
        is_bot: false,
        first_name: 'TestUser',
      },
      reply: jest.fn(),
      replyWithMarkdownV2: jest.fn(),
    }

    ;(delete_last_transaction as jest.Mock).mockResolvedValue(null)

    await deleteLastEntry(mockCtx as BotContext)

    expect(delete_last_transaction).toHaveBeenCalledWith(12345)

    const expectedNoRecordMessage = 'No record to delete.'
    expect(mockCtx.reply).toHaveBeenCalledWith(expectedNoRecordMessage)

    expect(mockCtx.replyWithMarkdownV2).not.toHaveBeenCalled()
  })
})
