import moment from 'moment'
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
        date: moment.utc(),
      },
      {
        amount: 50,
        description: 'Lunch',
        category: 'food',
        date: moment.utc(),
      },
    ]
    expect(calculateByCategory(transactions)).toEqual({ food: 150 })
  })

  it('should handle multiple categories', () => {
    const transactions: Transaction[] = [
      {
        amount: 100,
        description: 'Groceries',
        category: 'food',
        date: moment.utc(),
      },
      {
        amount: 40,
        description: 'Train Ticket',
        category: 'transport',
        date: moment.utc(),
      },
      {
        amount: 200,
        description: 'Buffet',
        category: 'food',
        date: moment.utc(),
      },
    ]
    expect(calculateByCategory(transactions)).toEqual({
      food: 300,
      transport: 40,
    })
  })
})
