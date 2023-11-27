import { isAuthenticated } from './user/isAuth'
import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  await isAuthenticated(event)

  return {
    timestamp: new Date().getTime(),
  }
})
