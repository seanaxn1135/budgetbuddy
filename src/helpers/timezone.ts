import moment, { type Moment } from 'moment'

export const getLocalMTDInUTC = (offset: number): Moment => {
  const currentUTC = moment.utc()
  const localDate = currentUTC.clone().utcOffset(offset * 60)
  const firstDayOfMonth = localDate.clone().date(1).startOf('day')
  const firstDayOfMonthUTC = firstDayOfMonth.clone().utc()
  return firstDayOfMonthUTC
}

export const getLocalYTDInUTC = (offset: number): Moment => {
  const currentUTC = moment.utc()
  const localDate = currentUTC.clone().utcOffset(offset * 60)
  const firstDayOfYear = localDate.clone().startOf('year')
  const firstDayOfYearUTC = firstDayOfYear.clone().utc()
  return firstDayOfYearUTC
}
