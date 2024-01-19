import {
  EXPENSE_CATEGORIES_EMOJI,
  INCOME_CATEGORIES_EMOJI,
} from '../constants/categories'
import type { Transaction } from '../entities/transaction'
import { calculateByCategory } from './calculate-by-category'

function getCategoryEmoji(
  category: string,
  categoryMap: Record<string, string>
): string {
  const emoji = categoryMap[category.toLowerCase()]
  return emoji ?? ''
}

function formatCategoryOutput(
  categoryTotals: Record<string, number>,
  title: string,
  categoryMap: Record<string, string>
): string {
  const total = Object.values(categoryTotals).reduce(
    (sum, amount) => sum + amount,
    0
  )

  const formattedLines = Object.entries(categoryTotals).map(
    ([category, amount]) => {
      const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1)
      const emoji = getCategoryEmoji(capitalizedCategory, categoryMap)
      const percentage = ((amount / total) * 100).toFixed(0)
      return `${amount} (${percentage}%) — ${emoji} ${capitalizedCategory}`
    }
  )

  const output = [
    `*${title}*`,
    ...(total > 0 ? formattedLines : ['No transactions']),
  ].join('\n')

  return output
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_[\]()#+\-.!])/g, '\\$1')
}

export function formatStats(
  expenses: Transaction[],
  income: Transaction[]
): string {
  const expensesByCategory = calculateByCategory(expenses)
  const incomeByCategory = calculateByCategory(income)
  const expensesOutput = formatCategoryOutput(
    expensesByCategory,
    '➖ Expenses',
    EXPENSE_CATEGORIES_EMOJI
  )
  const incomeOutput = formatCategoryOutput(
    incomeByCategory,
    '➕ Income',
    INCOME_CATEGORIES_EMOJI
  )
  const totalExpenses = Object.values(expensesByCategory).reduce(
    (sum, amount) => sum + amount,
    0
  )
  const totalIncome = Object.values(incomeByCategory).reduce(
    (sum, amount) => sum + amount,
    0
  )
  const totalOutput = `Total expenses: *$${totalExpenses.toFixed(
    2
  )}*\nTotal income: *$${totalIncome.toFixed(2)}*\n\nTotal: *${
    totalIncome - totalExpenses >= 0 ? '$' : '-$'
  }${Math.abs(totalIncome - totalExpenses).toFixed(2)}*`
  return (
    escapeMarkdown(expensesOutput) +
    '\n\n' +
    escapeMarkdown(incomeOutput) +
    '\n\n' +
    escapeMarkdown(totalOutput)
  )
}
