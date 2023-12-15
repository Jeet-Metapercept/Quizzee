import OpenAI from 'openai'
import { z } from 'zod'
import { checkPerms, returnUnauthorized } from '../../ai/example/util'
import { serverSupabaseUser } from '#supabase/server'
import { useRuntimeConfig } from '#imports'

const AUTH_REQUIRED = false
const DeleteFilesSchema = z.object({
  file_id: z.array(z.string()).min(1),
})

export default defineEventHandler(async (event) => {
  if (AUTH_REQUIRED) {
    const user = await serverSupabaseUser(event)
    if (!checkPerms(user))
      return returnUnauthorized()
  }

  const body = await readBody(event)
  const validationResult = DeleteFilesSchema.safeParse(body)

  if (!validationResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid request',
      data: validationResult.error.issues,
    })
  }

  const runtimeConfig = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: runtimeConfig.OPENAI_API_KEY,
    timeout: 30 * 1000,
  })

  try {
    const deletionResults = await Promise.all(validationResult.data.file_id.map(async (fileId) => {
      const deletionResponse = await openai.files.del(fileId)
      return { fileId, deleted: deletionResponse.deleted }
    }))

    return {
      status: 'success',
      data: deletionResults,
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
