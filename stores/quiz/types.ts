import type { QuestionRow } from '~/utils/types/types'

export interface State {
  quizid: string | null
  questions: QuestionRow[]
  currentQuestion: number | null
}
