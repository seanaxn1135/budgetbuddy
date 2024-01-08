import { categorizeExpenseScene } from './categorize-expense'
import { categorizeIncomeScene } from './categorize-income'
import { statsTimeframeScene } from './stats'
import { setTimezoneScene, selectTimezoneActionScene } from './set-timezone'
import { listTimeframeScene } from './list'

export const scenes = [
  categorizeExpenseScene,
  categorizeIncomeScene,
  statsTimeframeScene,
  setTimezoneScene,
  selectTimezoneActionScene,
  listTimeframeScene,
]
