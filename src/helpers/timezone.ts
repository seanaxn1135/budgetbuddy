import moment, { type Moment } from 'moment'

export const getStartOfThisMonthInUTC = (offset: number): Moment => {
  const currentUTC = moment.utc()
  const localDate = currentUTC.clone().utcOffset(offset * 60)
  const firstDayOfMonth = localDate.clone().date(1).startOf('day')
  const firstDayOfMonthUTC = firstDayOfMonth.clone().utc()
  return firstDayOfMonthUTC
}

export const getStartOfThisYearInUTC = (offset: number): Moment => {
  const currentUTC = moment.utc()
  const localDate = currentUTC.clone().utcOffset(offset * 60)
  const firstDayOfYear = localDate.clone().startOf('year')
  const firstDayOfYearUTC = firstDayOfYear.clone().utc()
  return firstDayOfYearUTC
}

export const getStartOfLastMonthInUTC = (offset: number): Moment => {
  const currentUTC = moment.utc()
  const localDate = currentUTC.clone().utcOffset(offset * 60)
  const firstDayOfLastMonth = localDate
    .clone()
    .subtract(1, 'month')
    .date(1)
    .startOf('day')
  const firstDayOfLastMonthUTC = firstDayOfLastMonth.clone().utc()
  return firstDayOfLastMonthUTC
}

export const getStartOfLastYearInUTC = (offset: number): Moment => {
  const currentUTC = moment.utc()
  const localDate = currentUTC.clone().utcOffset(offset * 60)
  const firstDayOfLastYear = localDate
    .clone()
    .subtract(1, 'year')
    .startOf('year')
  const firstDayOfLastYearUTC = firstDayOfLastYear.clone().utc()
  return firstDayOfLastYearUTC
}
