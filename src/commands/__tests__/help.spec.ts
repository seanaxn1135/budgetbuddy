import { createCtxWithMessage } from './../../test-helper/create-ctx'
import type { BotContext } from '../../global'
import help from '../help'
import { escapeMarkdown } from '../../helpers/format-list'
import { HELP_MESSAGE } from '../../constants/messages'

describe('help command', () => {
  let ctx: BotContext
  it('should send a help message', async () => {
    ctx = createCtxWithMessage('/help')
    await help(ctx)
    expect(ctx.replyWithMarkdownV2).toHaveBeenCalledWith(
      escapeMarkdown(HELP_MESSAGE)
    )
  })
})
