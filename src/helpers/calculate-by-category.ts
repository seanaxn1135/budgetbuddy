import type { Transaction } from '../entities/transaction'

export function calculateByCategory(
  transactions: Transaction[]
): Record<string, number> {
  const initialValue: Record<string, number> = {}

  return transactions.reduce((acc, transaction) => {
    const { category, amount } = transaction

    if (typeof acc[category] !== 'number') {
      acc[category] = 0
    }

    acc[category] = parseFloat((acc[category] + amount).toFixed(2))
    return acc
  }, initialValue)
}
