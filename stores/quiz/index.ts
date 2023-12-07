import { defineStore } from 'pinia'
import type { State } from './types'
import { useToast } from '@/components/ui/toast/use-toast'
import type { Database } from '~/utils/types/supabase.types'
import type { QuizRow } from '~/utils/types/quiz.types'

const { toast } = useToast()

export const useQuizStore = defineStore('quizStore', {
  state: (): State => ({
    quizid: null,
  }),
  getters: { },
  actions: {
    async FETCH_QUIZZE({ quizid }: { quizid: string }) {
      const client = useSupabaseClient<Database>()

      if (!quizid) {
        toast({
          title: 'Error',
          description: 'Invalid Quiz ID',
          variant: 'destructive',
          duration: 4000,
        })
        return null
      }

      const { data, error } = await client
        .from('quiz_bank')
        .select('*')
        .eq('id', quizid)
        .single()

      if (error) {
        console.error(error.message)
        // toast({
        //   description: error.message,
        //   variant: 'destructive',
        //   duration: 4000,
        // })
        return null
      }

      return data
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
