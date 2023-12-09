import { z } from 'zod'

export type QuizViewState = 'pre' | 'ready' | 'in-process' | 'submit' | 'complete' | 'result' | 'error'

const uuidSchema = z.string().uuid()
export function getValidQuizIdFromRouteParam(param: string | string[]): string | null {
  let quizId = null

  if (Array.isArray(param))
    quizId = param.length > 0 ? param[0] : null

  else if (typeof param === 'string')
    quizId = param

  try {
    uuidSchema.parse(quizId)
    return quizId
  }
  catch (error) {
    return null
  }
}
