import { serverSupabaseClient } from '#supabase/server'
import { isAuthenticated } from '~/server/api/user/isAuth'
import type { Database } from '~/utils/types/supabase.types'

export default defineEventHandler(async (event) => {
  await isAuthenticated(event)

  const client = await serverSupabaseClient<Database>(event)
  const { data } = await client.from('question_bank').select('*')

  return { data }
})
