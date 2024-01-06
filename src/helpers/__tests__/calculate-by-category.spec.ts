import type { Transaction } from './../../entities/transaction'
import { calculateByCategory } from './../calculate-by-category'

describe('calculateByCategory', () => {
  it('should return an empty object for no transactions', () => {
    const transactions: Transaction[] = []
    expect(calculateByCategory(transactions)).toEqual({})
  })

  it('should correctly sum amounts in the same category', () => {
    const transactions: Transaction[] = [
      {
        amount: 100,
        description: 'Groceries',
        category: 'food',
        date: new Date(),
      },
      { amount: 50, description: 'Lunch', category: 'food', date: new Date() },
    ]
    expect(calculateByCategory(transactions)).toEqual({ food: 150 })
  })

  it('should handle multiple categories', () => {
    const transactions: Transaction[] = [
      {
        amount: 100,
        description: 'Groceries',
        category: 'food',
        date: new Date(),
      },
      {
        amount: 40,
        description: 'Train Ticket',
        category: 'transport',
        date: new Date(),
      },
      {
        amount: 200,
        description: 'Buffet',
        category: 'food',
        date: new Date(),
      },
    ]
    expect(calculateByCategory(transactions)).toEqual({
      food: 300,
      transport: 40,
    })
  })
})
