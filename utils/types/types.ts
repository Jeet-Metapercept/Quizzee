import { z } from 'zod'

export interface Answer {
  text: string
  image_url: string | null
  is_correct: boolean
}

export interface QuestionRow {
  question: {
    text: string
    description: string
    image_url: string | null
    reference: string
  }
  answers: {
    text: string
    image_url: string | null
    is_correct: boolean
  }[]
  author: string
  category: string
  difficulty: number
  tags: string[]
  views: number
  published: boolean
}

const questionSchema = z.object({
  text: z.string()
    .min(5, 'Question text must be at least 5 characters.')
    .max(250, 'Question text cannot exceed 250 characters.'),
  description: z.string()
    .min(10, 'Question description must be at least 10 characters.')
    .max(700, 'Question description cannot exceed 700 characters.'),
  image_url: z.string().url().nullable().optional(),
  reference: z.string()
    .min(5, 'Reference must be at least 5 characters.')
    .max(100, 'Reference cannot exceed 100 characters.'),
})

const answerSchema = z.object({
  text: z.string()
    .min(5, 'Answer text must be at least 5 characters.')
    .max(100, 'Answer text cannot exceed 100 characters.'), // Add min and max validation here
  image_url: z.string().url().nullable().optional(),
  is_correct: z.boolean(),
})

export const questionRowSchema = z.object({
  question: questionSchema,
  answers: z
    .array(answerSchema)
    .refine(answers => answers.length >= 2, {
      message: 'At least two answers are required.',
    })
    .refine(answers => answers.some(answer => answer.is_correct), {
      message: 'At least one answer must have Marked as Correct answer.',
    }),
  author: z.string().email(),
  category: z.string(),
  difficulty: z.number().min(1).max(10),
  tags: z.array(z.string()),
  views: z.number(),
  published: z.boolean(),
})
