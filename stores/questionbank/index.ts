import { defineStore } from 'pinia'
import type { State } from './types'
import { useToast } from '@/components/ui/toast/use-toast'
import type { Database } from '~/utils/types/supabase.types'

const { toast } = useToast()
const client = useSupabaseClient<Database>()

export const useQuestionStore = defineStore('questionStore', {
  state: (): State => ({
    question: '',
  }),
  getters: {
  },
  actions: {
    async  GET_QUESTIONS() {
      const { data: question_bank, error } = await client
        .from('question_bank')
        .select('*')
        // .select('some_column,other_column')

      if (error) {
        toast({
          description: error.message,
          variant: 'destructive',
          duration: 4000,
        })
        return error
      }

      return question_bank
    },

  },
})
