import { Markup, Scenes } from 'telegraf'
import type { BotContext } from '../global'
import { TIMEZONE_ACTIONS } from '../constants/timezone-actions'
import {
  TIMEZONE_CANCEL_ACTION_MESSAGE,
  CURRENT_TIMEZONE,
  GENERAL_ERROR_MESSAGE,
  MISSING_PROPERTIES_ERROR_MESSAGE,
  SET_TIMEZONE_INVALID_INPUT,
  SET_TIMEZONE_PROMPT,
  TIMEZONE_ACTION_SELECT_REMINDER,
} from '../constants/messages'
import { getTzOffset, upsertUserConfig } from '../persistence/user-config'
import { message } from 'telegraf/filters'

export const selectTimezoneActionScene = new Scenes.BaseScene<BotContext>(
  'SELECT_TIMEZONE_ACTION'
)
export const setTimezoneScene = new Scenes.BaseScene<BotContext>('SET_TIMEZONE')

// SELECT TIMEZONE ACTION
selectTimezoneActionScene.enter(async (ctx) => {
  const keyboard = TIMEZONE_ACTIONS.map((actions) => [
    Markup.button.callback(actions.label, actions.callbackData),
  ])
  if (ctx.from === undefined) {
    await ctx.reply(GENERAL_ERROR_MESSAGE)
    console.error(MISSING_PROPERTIES_ERROR_MESSAGE)
    return
  }
  const initialTz = await getTzOffset(ctx.from?.id)

  if (initialTz === null) {
    await ctx.reply(GENERAL_ERROR_MESSAGE)
    console.error('Error: Timezone offset not found')
    return
  }
  await ctx.reply(CURRENT_TIMEZONE(initialTz), Markup.inlineKeyboard(keyboard))
})

selectTimezoneActionScene.action('set_timezone', async (ctx) => {
  await ctx.scene.enter('SET_TIMEZONE')
})

selectTimezoneActionScene.action('cancel', async (ctx) => {
  await ctx.editMessageText(TIMEZONE_CANCEL_ACTION_MESSAGE)
  await ctx.scene.leave()
})

selectTimezoneActionScene.use(
  async (ctx) => await ctx.reply(TIMEZONE_ACTION_SELECT_REMINDER)
)

// SET TIMEZONE
setTimezoneScene.enter(async (ctx) => {
  await ctx.editMessageText(SET_TIMEZONE_PROMPT)
})

setTimezoneScene.on(message('text'), async (ctx) => {
  try {
    const input = ctx.message.text
    const offset = validateAndRoundTimezoneOffset(input)

    if (offset !== null) {
      await upsertUserConfig(ctx.from.id, offset)
      const updatedTz = await getTzOffset(ctx.from?.id)
      if (updatedTz === null) {
        await ctx.reply(GENERAL_ERROR_MESSAGE)
        console.error('Error: Timezone offset not found')
        return
      }
      await ctx.reply(CURRENT_TIMEZONE(updatedTz))
      await ctx.scene.leave()
    } else {
      await ctx.reply(SET_TIMEZONE_INVALID_INPUT)
    }
  } catch (error) {
    console.error('Error in setting timezone:', error)
    await ctx.reply(GENERAL_ERROR_MESSAGE)
  }
})

const validateAndRoundTimezoneOffset = (input: string): number | null => {
  const offset = parseFloat(input)
  if (!isNaN(offset) && offset >= -12 && offset <= 14) {
    return Math.round(offset * 10) / 10
  }
  return null
}
