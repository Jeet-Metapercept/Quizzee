import { serverSupabaseUser } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const isAuthenticated = await serverSupabaseUser(event)
  if (!isAuthenticated) {
    throw createError({
      statusCode: 403,
      statusMessage:
        'Access Denied: You do not have permission to access this resource.',
    })
  }

  return {
    timestamp: new Date().getTime(),

  }
})
