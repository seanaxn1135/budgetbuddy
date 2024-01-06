import supabase from './initialize'

export const getExpenses: any = async (
  user_id: number,
  fromDate: Date,
  toDate: Date
) => {
  const { data, error } = await supabase
    .from('expense')
    .select('user_id, description, amount, category, date')
    .eq('user_id', user_id)
    .gte('date', fromDate.toISOString())
    .lte('date', toDate.toISOString())
  if (error !== null) {
    console.error('Error fetching data:', error)
    return null
  }
  return data
}
