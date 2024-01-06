import type { Context as TelegrafContext, Scenes } from 'telegraf'

type BotContext = TelegrafContext &
  Scenes.SceneContext & {
    session: Scenes.SceneSession & {
      transaction?: {
        amount: number
        description: string
        category?: string
      }
    }
  }

export type { BotContext }
