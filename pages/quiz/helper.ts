import { z } from 'zod'
import type { ResultQuestion, SubmissionItem } from '~/utils/types/result.types'

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

export function getScore({ questions, answers }: { questions: ResultQuestion[]; answers: SubmissionItem[] }) {
  let total = 0
  let correct = 0
  let incorrect = 0

  answers.forEach((userAnswer) => {
    const question = questions.find(q => q.id === userAnswer.question_id)

    if (question) {
      total++

      // Check if at least one user's submitted answer is correct
      const isAnyCorrect = userAnswer.submitted_answers.some((submitted) => {
        // Find the correct answer from the question
        const correctAnswer = question.answers.find(answer => answer.is_correct)

        // Check if the submitted answer is selected and matches the correct answer
        return submitted.is_selected && correctAnswer && submitted.text === correctAnswer.text
      })

      if (isAnyCorrect)
        correct++

      else
        incorrect++
    }
  })

  // Calculate the percentage of correct answers
  const correctPercentage = total > 0 ? (correct / total) * 100 : 0

  return { total, correct, incorrect, correctPercentage }
}
