import moment from 'moment'
import { combineAndFormatLists } from '../format-list'

describe('combineAndFormatLists', () => {
  it('should correctly combine and format lists with different dates', () => {
    const expenses = [
      {
        amount: 100,
        description: 'Groceries',
        category: 'Food',
        date: moment.utc('2024-01-05T10:00:00Z'),
      },
      {
        amount: 50,
        description: 'Internet',
        category: 'Utility',
        date: moment.utc('2024-01-06T10:00:00Z'),
      },
    ]
    const income = [
      {
        amount: 1000,
        description: 'Salary',
        category: 'Job',
        date: moment.utc('2024-01-05T12:00:00Z'),
      },
    ]
    const tzOffset = 0
    const result = combineAndFormatLists(expenses, income, tzOffset)
    const expectedOutput =
      '*6 Jan 2024, Saturday*\n' +
      '➖ $50 Internet\n' +
      '\n' +
      '*5 Jan 2024, Friday*\n' +
      '➕ $1000 Salary\n' +
      '➖ $100 Groceries'

    expect(result).toBe(expectedOutput)
  })
})
