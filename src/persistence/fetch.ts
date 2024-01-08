import { FETCH_DATA_ERROR } from '../constants/messages'
import supabase from './initialize'

export const getExpenses: any = async (
  user_id: number,
  fromDate: Date,
  toDate: Date,
  toOrder?: 'asc' | 'desc'
) => {
  let query = supabase
    .from('expense')
    .select('amount, description, category, date')
    .eq('user_id', user_id)
    .gte('date', fromDate.toISOString())
    .lte('date', toDate.toISOString())
  if (toOrder === 'asc') {
    query = query.order(toOrder, { ascending: true })
  } else if (toOrder === 'desc') {
    query = query.order(toOrder, { ascending: false })
  }

  const { data, error } = await query

  if (error !== null) {
    console.error(FETCH_DATA_ERROR, error)
    return null
  }
  return data
}

export const getIncome: any = async (
  user_id: number,
  fromDate: Date,
  toDate: Date,
  toOrder?: 'asc' | 'desc'
) => {
  let query = supabase
    .from('income')
    .select('amount, description, category, date')
    .eq('user_id', user_id)
    .gte('date', fromDate.toISOString())
    .lte('date', toDate.toISOString())
  if (toOrder === 'asc') {
    query = query.order(toOrder, { ascending: true })
  } else if (toOrder === 'desc') {
    query = query.order(toOrder, { ascending: false })
  }
  const { data, error } = await query

  if (error !== null) {
    console.error(FETCH_DATA_ERROR, error)
    return null
  }
  return data
}
