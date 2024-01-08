import moment from 'moment'
import type { Transaction } from '../../entities/transaction'
import { formatStats } from '../format-stats'

test('dummy test', () => {
  expect(true).toBe(true)
})

describe('Format Stats', () => {
  it('should return correct format with no transactions', () => {
    const expenses: Transaction[] = []
    const income: Transaction[] = []
    const expectedFormat = `*➖ Expenses*
No transactions

*➕ Income*
No transactions

Total expenses: *$0*
Total income: *$0*

Total: *$0\\.00*`
    expect(formatStats(expenses, income)).toEqual(expectedFormat)
  })

  it('should return correct format with expenses and income', () => {
    const expenses: Transaction[] = [
      {
        amount: 200,
        description: 'hello',
        category: 'food',
        date: moment('2024-01-06T16:21:07'),
      },
      {
        amount: 100,
        description: 't-shirt',
        category: 'clothing',
        date: moment('2024-01-06T16:32:45'),
      },
    ]
    const income: Transaction[] = []
    const expectedFormat = `*➖ Expenses*
200 \\(67%\\) — 🍔 Food
100 \\(33%\\) — 👕 Clothing

*➕ Income*
No transactions

Total expenses: *$300*
Total income: *$0*

Total: *\\-$300\\.00*`
    expect(formatStats(expenses, income)).toEqual(expectedFormat)
  })

  it('should return correct format with expenses and income', () => {
    const expenses: Transaction[] = [
      {
        amount: 200,
        description: 'hello',
        category: 'food',
        date: moment('2024-01-06T16:21:07'),
      },
      {
        amount: 100,
        description: 't-shirt',
        category: 'clothing',
        date: moment('2024-01-06T16:32:45'),
      },
    ]
    const income: Transaction[] = [
      {
        amount: 5000,
        description: 'work',
        category: 'salary',
        date: moment('2024-01-06T16:33:45'),
      },
    ]
    const expectedFormat = `*➖ Expenses*
200 \\(67%\\) — 🍔 Food
100 \\(33%\\) — 👕 Clothing

*➕ Income*
5000 \\(100%\\) — 💰 Salary

Total expenses: *$300*
Total income: *$5000*

Total: *$4700\\.00*`
    expect(formatStats(expenses, income)).toEqual(expectedFormat)
  })

  it('should not have floating point arithmetic in total', () => {
    const expenses: Transaction[] = [
      {
        amount: 200,
        description: '',
        category: 'food',
        date: moment('2024-01-06T16:21:07'),
      },
      {
        amount: 300,
        description: '',
        category: 'transportation',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 200,
        description: '',
        category: 'healthcare',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 200,
        description: 'cake',
        category: 'clothing',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 41,
        description: 'beer',
        category: 'food',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 41,
        description: 'beer',
        category: 'food',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 4.94,
        description: 'lunch',
        category: 'food',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 200,
        description: 'today',
        category: 'entertainment',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 200,
        description: 'hello',
        category: 'food',
        date: moment('2024-01-06T16:32:45'),
      },
      {
        amount: 100,
        description: 'food',
        category: 'food',
        date: moment('2024-01-06T16:32:45'),
      },
    ]
    const income: Transaction[] = [
      {
        amount: 200,
        description: 'work',
        category: 'salary',
        date: moment('2024-01-06T16:33:45'),
      },
      {
        amount: 1000,
        description: '',
        category: 'salary',
        date: moment('2024-01-06T16:33:45'),
      },
    ]
    const expectedFormat = `*➖ Expenses*
586\\.94 \\(39%\\) — 🍔 Food
300 \\(20%\\) — 🚖 Transportation
200 \\(13%\\) — 💊 Healthcare
200 \\(13%\\) — 👕 Clothing
200 \\(13%\\) — 🕹️ Entertainment

*➕ Income*
1200 \\(100%\\) — 💰 Salary

Total expenses: *$1486\\.94*
Total income: *$1200*

Total: *\\-$286\\.94*`
    expect(formatStats(expenses, income)).toEqual(expectedFormat)
  })
})
