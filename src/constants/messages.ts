export const INCOME_MESSAGE = 'This is income'
export const EXPENSE_MESSAGE = 'This is expense'
export const INVALID_FORMAT_MESSAGE = 'I do not understand'

// CATEGORY
export const CATEGORY_SELECT_PROMPT = 'Please select a category:'
export const CATEGORY_SELECT_REMINDER = 'Please choose a category'
export const CATEGORY_EXPENSE_CONFIRMATION = (category: string): string =>
  `Category ${category} selected. Expense saved.`
export const CATEGORY_INCOME_CONFIRMATION = (category: string): string =>
  `Category ${category} selected. Income saved.`

// STATS
export const STATS_TIMEFRAME_PROMPT = 'Please select a timeframe:'
