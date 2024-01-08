import moment, { type Moment } from 'moment'
import formatDate from './format-date'
import { type Transaction } from '../entities/transaction'

type CombinedListItem = Transaction & {
  isIncome: boolean
  localDate: Moment
}

function escapeMarkdown(text: string): string {
  return text.replace(/([_[\]()#+\-.!])/g, '\\$1')
}

function preprocessList(
  list: Transaction[],
  isIncome: boolean,
  tzOffset: number
): CombinedListItem[] {
  return list.map((item) => ({
    ...item,
    isIncome,
    localDate: moment.utc(item.date).add(tzOffset, 'hours'),
  }))
}

function combineAndSortLists(
  expenses: Transaction[],
  income: Transaction[],
  tzOffset: number
): CombinedListItem[] {
  const combinedList = [
    ...preprocessList(expenses, false, tzOffset),
    ...preprocessList(income, true, tzOffset),
  ]
  combinedList.sort((a, b) => b.localDate.diff(a.localDate))
  return combinedList
}

function formatDateOutput(combinedList: CombinedListItem[]): string {
  const formattedOutputLines: string[] = []
  let currentDate: Moment | null = null

  combinedList.forEach((item, index) => {
    if (currentDate === null || !item.localDate.isSame(currentDate, 'day')) {
      if (index !== 0) {
        formattedOutputLines.push('')
      }
      currentDate = item.localDate
      formattedOutputLines.push(
        `*${formatDate(
          currentDate,
          item.localDate.utcOffset(),
          'D MMM YYYY, dddd'
        )}*`
      )
    }

    const sign = item.isIncome ? '➕' : '➖'
    formattedOutputLines.push(`${sign} $${item.amount} ${item.description}`)
  })

  return escapeMarkdown(formattedOutputLines.join('\n').trim())
}

export function combineAndFormatLists(
  expenses: Transaction[],
  income: Transaction[],
  tzOffset: number = 0
): string {
  const combinedList = combineAndSortLists(expenses, income, tzOffset)
  return formatDateOutput(combinedList)
}
