import { defineStore } from 'pinia'
import type { State } from './types'
import { useToast } from '@/components/ui/toast/use-toast'
import type { Database } from '~/utils/types/supabase.types'

const { toast } = useToast()

export const useQuestionStore = defineStore('questionStore', {
  state: (): State => ({
    question: '',
    categories: [],
  }),
  getters: {
    CATEGORIES: state => state.categories,
  },
  actions: {
    async FETCH_QUESTIONS() {
      const client = useSupabaseClient<Database>()
      const { data: question_bank, error } = await client
        .from('question_bank')
        .select('*')

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
    async FETCH_CATEGORY() {
      const client = useSupabaseClient<Database>()
      const { data, error } = await client
        .from('category')
        .select('name')

      if (error) {
        toast({
          description: error.message,
          variant: 'destructive',
          duration: 4000,
        })
        return error
      }

      const response = data.map(d => d.name) as string[]
      this.categories = response

      return response
    },
  },
})
