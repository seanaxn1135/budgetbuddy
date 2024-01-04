import type { TablesInsert } from '../database.types'
import supabase from './initialize'

const insertIncome = async (
  userr_id: number,
  description: string,
  amount: number,
  category: string,
  date: number
): Promise<TablesInsert<'income'> | null> => {
  const { data, error } = await supabase
    .from('income')
    .insert([
      { userr_id, description, amount, category, date: new Date(date * 1000) },
    ])

  if (error !== null) {
    console.error('Error inserting data:', error)
    return null
  }

  return data
}

export default insertIncome
