export interface QuizQuestionType {
  text: string
  image_url: string | null
  reference: string
  description: string
}

interface QuizAnswer {
  text: string
  image_url: string | null
}

export interface UserAnswer {
  text: string
  is_selected?: boolean
}

export interface QuizQuestion {
  id: number
  category: string
  question: QuizQuestionType
  view_only_answers: QuizAnswer[]
  submitted_answers?: UserAnswer[]
}

export interface State {
  quizid: string | null
  questions: QuizQuestion[]
  currentQuestion: number | null
}
