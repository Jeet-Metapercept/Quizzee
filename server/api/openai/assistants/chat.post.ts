/* eslint-disable no-console */
import OpenAI from 'openai'
import { z } from 'zod'
import { checkPerms, returnUnauthorized } from '../../ai/example/util'
import { serverSupabaseUser } from '#supabase/server'
import { useRuntimeConfig } from '#imports'

const QueryParamsSchema = z.object({
  message: z.string(),
})

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

  const body = await readBody(event)
  const validationResult = QueryParamsSchema.safeParse(body)

  if (!validationResult.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid query parameters',
      data: validationResult.error.issues,
    })
  }

  try {
    const assistant_id = 'asst_CIcdGNVX7z6upqNMv0HDB0KA'
    const thread_id = 'thread_iE7qTWSkxmzPhVks05GfEfTG'

    // Add a Message to Thread.
    await openai.beta.threads.messages.create(
      thread_id,
      { role: 'user', content: validationResult.data.message },
    )

    // Run Thread with updated messages.
    const run = await openai.beta.threads.runs.create(
      thread_id,
      { assistant_id },
    )

    // Check run status until completed
    await pollRunStatus({ threadId: thread_id, runId: run.id, interval: 5000, maxAttempts: 5 }).catch((e) => {
      throw createError({
        statusCode: 400,
        statusMessage: e,
      })
    })

    // Check run Step (OPTIONAL) started, in_progress, completed
    // await openai.beta.threads.runs.steps.retrieve

    // Pull a (updated) Messages from Thread.
    const threadMessages = await openai.beta.threads.messages.list(
      thread_id,
      {
        limit: 5,
        order: 'desc',
      },
    )

    return threadMessages
  }
  catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Error from assistant',
      data: error,
    })
  }
})

async function pollRunStatus({ threadId, runId, interval, maxAttempts }: { threadId: string; runId: string; interval: number; maxAttempts: number }): Promise<OpenAI.Beta.Threads.Runs.Run> {
  return new Promise((resolve, reject) => {
    let attempts = 0
    const startTime = Date.now()

    const poll = setInterval(async () => {
      try {
        if (attempts >= maxAttempts) {
          clearInterval(poll)
          const duration = (Date.now() - startTime) / 1000
          console.log(`Polling stopped after ${duration} seconds due to max attempts${maxAttempts}.`)
          reject(new Error('Max polling attempts reached. Stopping polling.'))
        }

        const run = await openai.beta.threads.runs.retrieve(threadId, runId)
        console.log('➜ Current run status:', run.status)

        if (run.status === 'completed' || run.status === 'failed') {
          clearInterval(poll)
          const duration = (Date.now() - startTime) / 1000
          console.log(`✔ Final run status: ${run.status}. on Attempt: ${attempts}, Time taken: ${duration} seconds.`)
          resolve(run)
        }

        attempts++
      }
      catch (error) {
        console.error('Error during polling:', error)
        clearInterval(poll)
        reject(error)
      }
    }, interval)
  })
}
