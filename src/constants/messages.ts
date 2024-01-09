export const INVALID_FORMAT_MESSAGE =
  'Oops! I didn’t catch that. Please ensure your message follows the correct format. Type /help for guidance on commands and usage.'

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
export const TIMEZONE_CANCEL_ACTION_MESSAGE =
  'Timezone update cancelled. Use /timezone to adjust it anytime.'
export const TIMEFRAME_PROMPT = 'Please select a timeframe:'

//  ERROR
export const GENERAL_ERROR_MESSAGE = 'An error occurred. Please try again.'
export const MISSING_PROPERTIES_ERROR_MESSAGE =
  'Error: Required properties are undefined.'
export const INSERT_DATA_ERROR = 'Error inserting data:'
export const FETCH_DATA_ERROR = 'Error fetching data:'
export const DELETE_DATA_ERROR = 'Error deleting data:'

//  START
export const START_MESSAGE = `
👋 Welcome to Budget Buddy, your personal finance assistant on Telegram!

💡 What I can do for you:
- Help you track your daily expenses and income.
- Provide a simple way to categorize and view your transactions.
- Offer insights into your spending habits with easy-to-understand statistics.

🚀 Getting Started:
1. Set your timezone by typing \`/timezone\` and following the instructions.
2. Simply type the amount and optionally add a description to log an expense. For example: \`30 lunch at cafe\`.
3. To log income, add a plus sign (+) before the amount. For example: \`+500 freelance work\`.
4. Use commands like \`/stats\`, \`/list\`, \`/delete\`, and \`/timezone\` to manage your finances.

🤔 Need help? Type \`/help\` to see all the commands and how to use them.

Let's start managing your finances smartly and efficiently! 🌟
`

//  HELP
export const HELP_MESSAGE = `
🌟 Welcome to Budget Buddy! Manage your finances easily with these commands:

- 📝 **Record an Expense:**
  Simply type the amount followed by an optional comment.
  Example: \`50 dinner with family\`

- 💰 **Record an Income:**
  Add a plus sign (+) before the amount.
  Example: \`+1500 salary\`

- 📊 **/stats:** Get an overview of your expenses and income.

- ❌ **/delete:** Remove your most recent transaction.

- 📋 **/list:** Display all your recorded transactions.

- ⏰ **/timezone:** Set your timezone for accurate date and time tracking.
  Example: \`/timezone +2\` for UTC+2.

- ℹ️ **/help:** Display this message again.

Start by typing the amount for an expense or income, and Budget Buddy will take care of the rest. Happy budgeting!
`

//  DELETE
export const DELETE_MESSAGE = (latestRecord: string): string =>
  `Your latest record *${latestRecord}* has been deleted.`
export const NO_RECORD_TO_DELETE = 'No record to delete.'
