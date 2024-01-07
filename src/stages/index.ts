import { categorizeExpenseScene } from './categorize-expense'
import { categorizeIncomeScene } from './categorize-income'
import { statsTimeframeScene } from './stats-timeframe'
import { setTimezoneScene, selectTimezoneActionScene } from './set-timezone'

export const scenes = [
  categorizeExpenseScene,
  categorizeIncomeScene,
  statsTimeframeScene,
  setTimezoneScene,
  selectTimezoneActionScene,
]
