import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY

if (SUPABASE_URL == null) {
  throw new Error('SUPABASE_URL not found in environment variables.')
}
if (SUPABASE_API_KEY == null) {
  throw new Error('SUPABASE_API_KEY not found in environment variables.')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY)

export default supabase
