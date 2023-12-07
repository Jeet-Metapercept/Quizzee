import type { QuizRow } from '~/utils/types/quiz.types'

export interface State {
  quizid: string | null
  questions: QuizRow[]
  currentQuestion: number | null
}
