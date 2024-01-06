import { getLocalMTDInUTC } from './../timezone'

describe('getLocalMTDInUTC', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return the correct UTC date for zero timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 12, 0, 0)))
    const offsetInHours = 0
    const result = getLocalMTDInUTC(offsetInHours)
    const expected = new Date('2024-01-01T00:00:00Z').toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 0, 0, 0)))
    const offsetInHours = 8
    const result = getLocalMTDInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 11, 31, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 0, 0, 0)))
    const offsetInHours = -5
    const result = getLocalMTDInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2024, 0, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset right before new month', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 31, 23, 0, 0)))
    const offsetInHours = 8
    const result = getLocalMTDInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2024, 0, 31, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset right after new month', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 1, 1, 0, 0, 0)))
    const offsetInHours = -5
    const result = getLocalMTDInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2024, 0, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })
})
