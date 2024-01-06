import type { TablesInsert } from '../database.types'
import supabase from './initialize'

const insertIncome = async (
  user_id: number,
  description: string,
  amount: number,
  category: string,
  date: Date
): Promise<TablesInsert<'income'> | null> => {
  const { data, error } = await supabase
    .from('income')
    .insert([{ user_id, description, amount, category, date }])

  if (error !== null) {
    console.error('Error inserting data:', error)
    return null
  }

  return data
}

export default insertIncome
