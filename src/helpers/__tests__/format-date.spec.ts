import formatDate from '../format-date'
import moment from 'moment'

describe('formatDate', () => {
  it('formats date correctly for positive timezone offset', () => {
    const date = moment.utc('2024-01-08T09:30:00Z')
    const tzOffset = 3
    const result = formatDate(date, tzOffset)
    const expected = 'Jan 8 2024'
    expect(result).toBe(expected)
  })

  it('formats date correctly for negative timezone offset', () => {
    const date = moment.utc('2024-01-08T09:30:00Z')
    const tzOffset = -5
    const result = formatDate(date, tzOffset)
    const expected = 'Jan 8 2024'
    expect(result).toBe(expected)
  })

  it('formats date correctly for zero timezone offset', () => {
    const date = moment.utc('2024-01-08T09:30:00Z')
    const tzOffset = 0
    const result = formatDate(date, tzOffset)
    const expected = 'Jan 8 2024'
    expect(result).toBe(expected)
  })
})
