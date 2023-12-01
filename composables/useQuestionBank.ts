import type { Database } from '~/utils/types/supabase.types'
import { useToast } from '@/components/ui/toast/use-toast'
import type { QuestionRow } from '~/utils/types/types'

const { toast } = useToast()
const duration = 4000

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
    // console.log(questionRow)
    const { data: c } = await client
      .from('question_bank')
      .select('*')
      .eq('question->>text', questionRow.question.text)

    if (c && c?.length > 0) {
      toast({
        title: 'Question already exists',
        description: questionRow.question.text,
        variant: 'destructive',
        duration,
      })
      return false
    }

    const { error } = await client
      .from('question_bank')
      .insert([questionRow])

    if (error) {
      toast({
        description: error.message,
        variant: 'destructive',
        duration,
      })
      return false
    }

    return true
  }

  return {
    getQuestions,
    createQuestion,
  }
}
