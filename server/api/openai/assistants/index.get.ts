import OpenAI from 'openai'
import { z } from 'zod'
import { checkPerms, returnUnauthorized } from '../../ai/example/util'
import { serverSupabaseUser } from '#supabase/server'
import { useRuntimeConfig } from '#imports'

const QueryParamsSchema = z.object({
  limit: z.number().min(1).max(100).optional().default(20),
  order: z.enum(['asc', 'desc']).optional().default('desc'),
})

const AUTH_REQUIRED = false

export default defineEventHandler(async (event) => {
  if (AUTH_REQUIRED) {
    const user = await serverSupabaseUser(event)
    if (!checkPerms(user))
      return returnUnauthorized()
  }

  const query = getQuery(event)
  const validationResult = QueryParamsSchema.safeParse(query)

  if (!validationResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid query parameters',
      data: validationResult.error.issues,
    })
  }

  const runtimeConfig = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: runtimeConfig.OPENAI_API_KEY,
    timeout: 30 * 1000,
  })

  try {
    const response = await openai.beta.assistants.list({
      limit: validationResult.data.limit,
      order: validationResult.data.order,
    })

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
      statusMessage: 'Error fetching assistant list:',
      data: error,
    })
  }
})
