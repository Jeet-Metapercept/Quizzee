export interface QuizQuestionType {
  text: string
  image_url: string | null
  reference: string
  description: string
}

interface QuizAnswer {
  text: string
  image_url?: string | null
}

export interface UserAnswer {
  text: string
  image_url?: string | null
  is_selected?: boolean
}

export interface QuizQuestion {
  id: number
  category: string
  question: QuizQuestionType
  view_only_answers: QuizAnswer[]
  submitted_answers?: UserAnswer[]
}

interface quizmeta {
  started_at?: Date
  ended_at?: Date
  leave_count: number
}

export interface State {
  quizid: string | null
  questions: QuizQuestion[]
  current_question: { question: QuizQuestion | null; index: number }
  marked_as_later: number[]
  meta: quizmeta
}
