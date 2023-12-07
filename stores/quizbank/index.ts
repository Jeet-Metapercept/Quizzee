import { defineStore } from 'pinia'
import type { State } from './types'
import { useToast } from '@/components/ui/toast/use-toast'
import type { Database } from '~/utils/types/supabase.types'
import type { QuizRow } from '~/utils/types/quiz.types'

const { toast } = useToast()

export const useQuizStore = defineStore('quizStore', {
  state: (): State => ({
    quiz: '',
  }),
  getters: { },
  actions: {
    async FETCH_QUIZZES({ limit }: { limit?: number }) {
      const client = useSupabaseClient<Database>()

      const { data, error } = await client
        .from('quiz_bank')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit || 10)

      if (error) {
        toast({
          description: error.message,
          variant: 'destructive',
          duration: 4000,
        })
        return error
      }

      return data
    },
    async NEW_QUIZ(quizData: QuizRow) {
      const client = useSupabaseClient<Database>()
      const { data, error } = await client
        .from('quiz_bank')
        .insert([quizData])
        .select()

      if (error) {
        toast({
          description: error.message,
          variant: 'destructive',
          duration: 4000,
        })
        return error
      }

      return data
    },
  },
})
