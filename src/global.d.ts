import type { Context as TelegrafContext, Scenes } from 'telegraf'

interface BotContext extends TelegrafContext, Scenes.SceneContext {
  session: Scenes.SceneSession & {
    transaction?: {
      amount: number
      description: string
      category?: string
    }
  }
}

export type { BotContext }
