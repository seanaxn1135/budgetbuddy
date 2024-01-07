import moment from 'moment'
import supabase from './initialize'
import { FETCH_DATA_ERROR } from '../constants/messages'

export const upsertUserConfig: any = async (
  user_id: number,
  tz_offset: number = 8
) => {
  const { data, error } = await supabase
    .from('user')
    .upsert({ user_id, tz_offset, updated_at: moment.utc().toISOString() })

  if (error !== null) {
    console.error('Error upserting data:', error)
    return null
  }

  return data
}

export const getTzOffset = async (user_id: number): Promise<number | null> => {
  const { data, error } = await supabase
    .from('user')
    .select('tz_offset')
    .eq('user_id', user_id)

  if (error !== null) {
    console.error(FETCH_DATA_ERROR, error)
    return null
  }

  if (data.length > 0) {
    return data[0].tz_offset
  } else {
    return null
  }
}
