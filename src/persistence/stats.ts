import supabase from './initialize'

export const getMTDExpenses: any = async (user_id: number) => {
  const { data, error } = await supabase
    .from('expense')
    .select('user_id, description, amount, category, date')
    .eq('user_id', user_id)
  if (error !== null) {
    console.error('Error fetching data:', error)
    return null
  }
  return data
}
