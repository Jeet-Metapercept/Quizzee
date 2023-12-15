import OpenAI from 'openai'
import { checkPerms, returnUnauthorized } from '../../ai/example/util'
import { serverSupabaseUser } from '#supabase/server'

const AUTH_REQUIRED = false
const runtimeConfig = useRuntimeConfig()
const openai = new OpenAI({
  apiKey: runtimeConfig.OPENAI_API_KEY,
  timeout: 30 * 1000,
})

export default defineEventHandler(async (event) => {
  if (AUTH_REQUIRED) {
    const user = await serverSupabaseUser(event)
    if (!checkPerms(user))
      return returnUnauthorized()
  }

  try {
    const response = await openai.files.list()
    if (response && response.data) {
      return {
        count: response.data.length,
        data: response.data,
      }
    }
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error fetching file list:',
      data: error,
    })
  }
})
