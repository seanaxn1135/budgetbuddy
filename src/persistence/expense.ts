import type { TablesInsert } from '../database.types'
import supabase from './initialize'

const insertExpense = async (
  user_id: number,
  description: string,
  amount: number,
  category: string,
  date: number
): Promise<TablesInsert<'expense'> | null> => {
  const { data, error } = await supabase
    .from('expense')
    .insert([
      { user_id, description, amount, category, date: new Date(date * 1000) },
    ])

  if (error !== null) {
    console.error('Error inserting data:', error)
    return null
  }

  return data
}

export default insertExpense
