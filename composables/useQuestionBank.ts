import type { Database } from '~/utils/types/supabase.types'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()
const duration = 4000

// Define an interface for the questionRow parameter
interface QuestionRow {
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
  difficulty: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  tags: string[]
  views: number
  published: boolean
}

export default function useQuestionBank() {
  const client = useSupabaseClient<Database>()

  // Fetch questions from the question_bank table
  const getQuestions = async () => {
    const { data, error } = await client
      .from('question_bank')
      .select('*')

    if (error) {
      toast({
        description: error.message,
        variant: 'destructive',
        duration,
      })
      return error
    }

    return data
  }

  // Create and insert a new question into the question bank
  const createQuestion = async (questionRow: QuestionRow) => {
    const data = questionRow
    // console.log(questionRow)
    // const { data, error } = await client
    //   .from('question_bank')
    //   .insert([questionRow])

    // if (error) {
    //   toast({
    //     description: error.message,
    //     variant: 'destructive',
    //     duration,
    //   })
    //   return error
    // }

    return data
  }

  return {
    getQuestions,
    createQuestion,
  }
}
