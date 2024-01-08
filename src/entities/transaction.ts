import { type Moment } from 'moment'

export type Transaction = {
  amount: number
  description: string
  category: string
  date?: Moment
}
