import { DELETE_DATA_ERROR } from '../constants/messages'
import supabase from './initialize'

export const delete_last_transaction: any = async (user_id: number) => {
  let { data: expenseData, error: expenseError } = await supabase
    .from('expense')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: false })
    .limit(1)

  let { data: incomeData, error: incomeError } = await supabase
    .from('income')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: false })
    .limit(1)

  if (
    (expenseError !== null && expenseError !== undefined) ||
    (incomeError !== null && incomeError !== undefined)
  ) {
    console.error(DELETE_DATA_ERROR, expenseError ?? incomeError)
    return null
  }

  expenseData = expenseData ?? []
  incomeData = incomeData ?? []

  let latestTransaction = null
  let tableName = ''
  if (expenseData.length === 0 && incomeData.length === 0) {
    return null
  } else if (
    expenseData.length === 0 ||
    (incomeData.length > 0 && incomeData[0].date > expenseData[0].date)
  ) {
    latestTransaction = incomeData[0]
    tableName = 'income'
  } else {
    latestTransaction = expenseData[0]
    tableName = 'expense'
  }

  const { error: deleteError } = await supabase
    .from(tableName)
    .delete()
    .eq('id', latestTransaction.id)

  if (deleteError !== null && deleteError !== undefined) {
    console.error(DELETE_DATA_ERROR, deleteError)
    return null
  }

  return latestTransaction
}
