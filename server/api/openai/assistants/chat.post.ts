/* eslint-disable no-console */
import type { Buffer } from 'node:buffer'
import { join } from 'node:path'
import { createWriteStream } from 'node:fs'
import OpenAI from 'openai'
import { z } from 'zod'
import { checkPerms, returnUnauthorized } from '../../ai/example/util'
import { serverSupabaseUser } from '#supabase/server'
import { useRuntimeConfig } from '#imports'

interface MessageContentText {
  type: 'text'
  text: {
    value: string
  }
}

interface MessageContentImageFile {
  type: 'image_file'
  image_file: {
    file_id: string
  }
}

interface ResponseType {
  role: 'user' | 'assistant'
  reply: string
  attachment?: string | null
}

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
    await pollRunStatus({ threadId: thread_id, runId: run.id, interval: 5000, maxAttempts: 10 }).catch((e) => {
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
        limit: 1,
        order: 'desc',
      },
    )

    // setup response
    const messageRole = threadMessages.data[0].role // assistant
    const messageTextContent: Array< MessageContentText> = threadMessages.data[0].content.filter(item => item.type === 'text') as MessageContentText[]

    const response: ResponseType = {
      role: messageRole,
      reply: messageTextContent[0].text.value,
    }

    // Retrieve message file if generated by assistant (in above reply)
    const messageImageContent: Array<MessageContentImageFile> = threadMessages.data[0].content.filter(item => item.type === 'image_file') as MessageContentImageFile[]
    if (messageRole === 'assistant') {
      const messageImageIds = messageImageContent.map(i => i.image_file)
      console.log(messageImageIds)

      console.log('found file...', messageImageIds[0].file_id)
      await delay(2000)

      // SDK does not support
      // const messageImageFile = await openai.beta.threads.messages.files.retrieve(
      //   thread_id,
      //   threadMessages.data[0].id,
      //   messageImageIds[0].file_id,
      // )

      console.log('saving file...', messageImageIds[0].file_id)
      await delay(2000)
      // 'file-id', 'path/to/save/image.png'
      await saveImage({
        thread_id,
        message_id: threadMessages.data[0].id,
        file_id: messageImageIds[0].file_id,
        file_path: './',
      }).catch(error => console.error(error))
    }

    console.log(response)

    return response
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

async function saveImage({
  file_id,
  file_path,
  thread_id,
  message_id,
}: {
  file_id: string
  file_path: string
  thread_id: string
  message_id: string
}): Promise<string> {
  try {
    // const url = `https://api.openai.com/v1/files/${fileId}/content`
    const url = `https://api.openai.com/v1/threads/${thread_id}/messages/${message_id}/files/${file_id}`
    const headers = {
      Authorization: `Bearer ${runtimeConfig.OPENAI_API_KEY}`,
    }

    const response = await fetch(url, { headers })
    if (!response.ok)
      throw new Error(`Error fetching file: ${response.statusText}`)

    const buffer = await response.blob()
    const writeStream = createWriteStream(file_path)
    writeStream.write(buffer)
    writeStream.end()

    return new Promise((resolve, reject) => {
      writeStream.on('finish', () => {
        console.log(`Image saved to ${file_path}`)
        resolve(file_path)
      })

      writeStream.on('error', (error) => {
        console.error('Error writing the file:', error)
        reject(error)
      })
    })
  }
  catch (error) {
    console.error('Error:', error)
    throw error
  }
}

function delay(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
