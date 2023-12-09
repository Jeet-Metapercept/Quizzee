import { z } from 'zod'

export interface Submission {
  question_id: number
  submitted_answers: {
    is_selected?: boolean
    text: string
  }[]
}

export interface ResultRow {
  quiz_id: string
  quiz_name?: string
  started_at?: string | Date
  ended_at?: string | Date
  time_taken?: number
  allowed_duration?: number
  on_background?: number
  max_q?: number
  attended?: number
  unattended?: number
  correct?: number
  incorrect?: number
  precentage?: number
  user?: string
  result_link?: string
  submission?: Submission[]
}

export const submissionSchema = z.array(
  z.object({
    question_id: z.number(),
    submitted_answers: z.array(
      z.object({
        is_selected: z.boolean(),
        text: z.string(),
      }),
    ),
  }),
)

export const quizResultSchema = z.object({
  quiz_id: z.number().optional(),
  quiz_name: z.string().optional(),
  started_at: z.union([z.string(), z.date()]).optional(),
  ended_at: z.union([z.string(), z.date()]).optional(),
  time_taken: z.number().optional(),
  allowed_duration: z.number().optional(),
  on_background: z.number().optional(),
  max_q: z.number().optional(),
  attended: z.number().optional(),
  unattended: z.number().optional(),
  correct: z.number().optional(),
  incorrect: z.number().optional(),
  percentage: z.number().optional(),
  user: z.string().optional(),
  result_link: z.string().optional(),
  submission: submissionSchema.optional(),
})
