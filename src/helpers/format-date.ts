import moment, { type Moment } from 'moment'

export default function formatDate(
  date: Moment,
  tzOffset: number,
  format: string = 'MMM D YYYY'
): string {
  const tzOffsetInMinutes = tzOffset * 60

  return moment(date).utcOffset(tzOffsetInMinutes).format(format)
}
