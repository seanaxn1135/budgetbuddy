import { FETCH_DATA_ERROR } from '../constants/messages'
import supabase from './initialize'

export const getExpenses: any = async (
  user_id: number,
  fromDate: Date,
  toDate: Date
) => {
  const { data, error } = await supabase
    .from('expense')
    .select('amount, description, category, date')
    .eq('user_id', user_id)
    .gte('date', fromDate.toISOString())
    .lte('date', toDate.toISOString())
  if (error !== null) {
    console.error(FETCH_DATA_ERROR, error)
    return null
  }
  return data
}

export const getIncome: any = async (
  user_id: number,
  fromDate: Date,
  toDate: Date
) => {
  const { data, error } = await supabase
    .from('income')
    .select('amount, description, category, date')
    .eq('user_id', user_id)
    .gte('date', fromDate.toISOString())
    .lte('date', toDate.toISOString())
  if (error !== null) {
    console.error(FETCH_DATA_ERROR, error)
    return null
  }
  return data
}
