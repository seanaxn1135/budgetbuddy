import {
  getStartOfLastMonthInUTC,
  getStartOfLastYearInUTC,
  getStartOfThisMonthInUTC,
  getStartOfThisYearInUTC,
} from './../timezone'

describe('getStartOfThisMonthInUTC', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return the correct UTC date for zero timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 12, 0, 0)))
    const offsetInHours = 0
    const result = getStartOfThisMonthInUTC(offsetInHours)
    const expected = new Date('2024-01-01T00:00:00Z').toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 0, 0, 0)))
    const offsetInHours = 8
    const result = getStartOfThisMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 11, 31, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 0, 0, 0)))
    const offsetInHours = -5
    const result = getStartOfThisMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2024, 0, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset right before new month', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 31, 23, 0, 0)))
    const offsetInHours = 8
    const result = getStartOfThisMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2024, 0, 31, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset right after new month', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 1, 1, 0, 0, 0)))
    const offsetInHours = -5
    const result = getStartOfThisMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2024, 0, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })
})

describe('getStartOfLastMonthInUTC', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return the correct UTC date for zero timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 12, 0, 0)))
    const offsetInHours = 0
    const result = getStartOfLastMonthInUTC(offsetInHours)
    const expected = new Date('2023-12-01T00:00:00Z').toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 0, 0, 0)))
    const offsetInHours = 8
    const result = getStartOfLastMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 10, 30, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 15, 0, 0, 0)))
    const offsetInHours = -5
    const result = getStartOfLastMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 11, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset right before new month', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 31, 23, 0, 0)))
    const offsetInHours = 8
    const result = getStartOfLastMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 11, 31, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset right after new month', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 1, 1, 0, 0, 0)))
    const offsetInHours = -5
    const result = getStartOfLastMonthInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 11, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })
})

describe('getStartOfThisYearInUTC', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return the correct UTC date for zero timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 3, 15, 12, 0, 0)))
    const offsetInHours = 0
    const result = getStartOfThisYearInUTC(offsetInHours)
    const expected = new Date('2024-01-01T00:00:00Z').toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 3, 15, 0, 0, 0)))
    const offsetInHours = 8
    const result = getStartOfThisYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 11, 31, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 3, 15, 0, 0, 0)))
    const offsetInHours = -5
    const result = getStartOfThisYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2024, 0, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset right before new year', () => {
    jest.setSystemTime(new Date(Date.UTC(2023, 11, 31, 23, 0, 0)))
    const offsetInHours = 2
    const result = getStartOfThisYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 11, 31, 22, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset right after new year', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 1, 0, 0, 0)))
    const offsetInHours = -2
    const result = getStartOfThisYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 0, 1, 2, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })
})

describe('getStartOfLastYearInUTC', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should return the correct UTC date for zero timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 3, 15, 12, 0, 0)))
    const offsetInHours = 0
    const result = getStartOfLastYearInUTC(offsetInHours)
    const expected = new Date('2023-01-01T00:00:00Z').toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 3, 15, 0, 0, 0)))
    const offsetInHours = 8
    const result = getStartOfLastYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2022, 11, 31, 16, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 3, 15, 0, 0, 0)))
    const offsetInHours = -5
    const result = getStartOfLastYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2023, 0, 1, 5, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for positive timezone offset right before new year', () => {
    jest.setSystemTime(new Date(Date.UTC(2023, 11, 31, 23, 0, 0)))
    const offsetInHours = 2
    const result = getStartOfLastYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2022, 11, 31, 22, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })

  it('should return the correct UTC date for negative timezone offset right after new year', () => {
    jest.setSystemTime(new Date(Date.UTC(2024, 0, 1, 0, 0, 0)))
    const offsetInHours = -2
    const result = getStartOfLastYearInUTC(offsetInHours)
    const expected = new Date(Date.UTC(2022, 0, 1, 2, 0, 0)).toISOString()
    expect(result.toISOString()).toBe(expected)
  })
})
