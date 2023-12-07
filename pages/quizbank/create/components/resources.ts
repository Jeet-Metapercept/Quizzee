import type { QuestionRow } from '~/utils/types/types'

// Sample Quiz Object
export const sampleQuestion: QuestionRow = {
  question: {
    text: 'What is the capital of France?',
    description: 'This question is about geography.',
    image_url: 'https://homefrance.com/en/wp-content/uploads/2019/10/Paris-The-most-popular-capital-of-the-world.jpg',
    reference: 'World Atlas',
  },
  answers: [
    { text: 'London', image_url: null, is_correct: false },
    { text: 'Berlin', image_url: null, is_correct: false },
    { text: 'Paris', image_url: null, is_correct: true },
    { text: 'Madrid', image_url: null, is_correct: false },
  ],
  author: 'john.doe@example.com',
  category: 'Geography',
  difficulty: 2,
  tags: ['capital cities', 'geography', 'France'],
  views: 0,
  published: false,
}
