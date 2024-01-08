import moment, { type Moment } from 'moment'

export default function formatDate(date: Moment, tzOffset: number): string {
  const tzOffsetInMinutes = tzOffset * 60

  return moment(date).utcOffset(tzOffsetInMinutes).format('MMM D YYYY')
}
