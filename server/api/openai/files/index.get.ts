import OpenAI from 'openai'
import { checkPerms, returnUnauthorized } from '../../example/util'
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
      for (const file of response.data)
        console.log(`ID: ${file.id}, Filename: ${file.filename}, Purpose: ${file.purpose}, Bytes: ${file.bytes}, Created At: ${new Date(file.created_at * 1000).toLocaleString()}`)
    }
    else {
      console.log('No files found.')
    }
  }
  catch (error) {
    console.error('Error fetching file list:', error)
  }
})
