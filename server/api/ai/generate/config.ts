import type OpenAI from 'openai'

export interface GenerateQuestionParams {
  category: string
  count: number
  difficulty: number
}

import { z } from 'zod'

export const GenerateQuestionSchema = z.object({
  category: z.string(),
  count: z.number().min(1).max(10),
  difficulty: z.number().min(1).max(10),
  message: z.string(),
})

export type GenerateQuestionRequest = z.infer<typeof GenerateQuestionSchema>

const ai_question_format = {
  question: {
    text: {
      type: 'string',
      minLength: 5,
      maxLength: 250,
      errorMessage: {
        min: 'Question must be at least 5 characters.',
        max: 'Question cannot exceed 250 characters.',
      },
    },
    description: {
      type: 'string',
      maxLength: 700,
      optional: true,
      errorMessage: {
        max: 'Question description cannot exceed 700 characters.',
      },
    },
  },
  answers: {
    type: 'array',
    min_answers: 4,
    max_answers: 4,
    of: {
      text: {
        type: 'string',
        minLength: 1,
        maxLength: 100,
        errorMessage: {
          min: 'Answer must be at least 1 characters.',
          max: 'Answer cannot exceed 100 characters.',
        },
      },
      is_correct: {
        type: 'boolean',
      },
    },
    validations: [
      { rule: 'minLength', value: 2, errorMessage: 'At least two options are required.' },
      { rule: 'containsCorrect', errorMessage: 'At least one option must be marked as correct.' },
      { rule: 'uniqueTexts', errorMessage: 'Options cannot have duplicates.' },
    ],
  },
  category: {
    type: 'string',
    optional: true,
  },
  difficulty: {
    type: 'number',
    min: 1,
    max: 10,
  },
  tags: {
    type: 'array',
    max: 2,
    of: {
      type: 'string',
      default: ['AI'],
    },
  },
}

export function systemPrompt({ category, count, difficulty }: GenerateQuestionParams): OpenAI.Chat.ChatCompletionSystemMessageParam {
  return {
    role: 'system',
    content: `You are an assistant tasked with creating ${count} quiz questions in the category of '${category}', with each question having a difficulty level of ${difficulty} (on a scale from 1 to 10, where 1 is easiest and 10 is hardest).
        Format these questions as JSON objects, matching the structure and validations as per the ${JSON.stringify(ai_question_format)} schema.
        Each question should include fields like text, and description. and a appropriate difficulty rating.
        Accompany each question with multiple-choice answers (4), specifying one correct answer and the rest as incorrect options.
        Ensure that the JSON format is consistent with the given structure, focusing on engaging and unique content for the '${category}' category.`,
  }
}
