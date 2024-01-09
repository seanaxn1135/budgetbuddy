export const INCOME_MESSAGE = 'This is income'
export const EXPENSE_MESSAGE = 'This is expense'
export const INVALID_FORMAT_MESSAGE = 'I do not understand'

//  CATEGORY
export const CATEGORY_SELECT_PROMPT = 'Please select a category:'
export const CATEGORY_SELECT_REMINDER = 'Please choose a category'
export const CATEGORY_EXPENSE_CONFIRMATION = (category: string): string =>
  `Category ${category} selected. Expense saved.`
export const CATEGORY_INCOME_CONFIRMATION = (category: string): string =>
  `Category ${category} selected. Income saved.`

//  STATS
export const TIMEFRAME_SELECT_REMINDER = 'Please choose a timeframe'

//  TIMEZONE
export const CURRENT_TIMEZONE = (tzOffset: number): string => {
  const sign = tzOffset >= 0 ? '+' : ''
  return `Your current timezone is UTC${sign}${tzOffset}`
}
export const TIMEZONE_ACTION_SELECT_REMINDER = 'Please choose an action'
export const SET_TIMEZONE_PROMPT =
  'Please enter your timezone as a UTC offset (e.g., +5.5, -2):'
export const SET_TIMEZONE_INVALID_INPUT =
  'Invalid input. Please enter a valid UTC offset (e.g., +3, -4, +5.5)'

// GENERAL
export const CANCEL_ACTION_MESSAGE = 'Operation cancelled.'
export const TIMEFRAME_PROMPT = 'Please select a timeframe:'

//  ERROR
export const GENERAL_ERROR_MESSAGE = 'An error occurred. Please try again.'
export const MISSING_PROPERTIES_ERROR_MESSAGE =
  'Error: Required properties are undefined.'
export const INSERT_DATA_ERROR = 'Error inserting data:'
export const FETCH_DATA_ERROR = 'Error fetching data:'
export const DELETE_DATA_ERROR = 'Error deleting data:'

//  START
export const START_MESSAGE =
  'Hello! Welcome to the Budget Bot. How can I assist you today?'

//  HELP
export const HELP_MESSAGE = `This bot can help you track your expenses and income. Here are the available commands:`

//  DELETE
export const DELETE_MESSAGE = (latestRecord: string): string =>
  `Your latest record *${latestRecord}* has been deleted.`
export const NO_RECORD_TO_DELETE = 'No record to delete.'
