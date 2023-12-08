import { defineStore } from 'pinia'
import type { QuizQuestion, State, UserAnswer } from './types'
import { useToast } from '@/components/ui/toast/use-toast'
import type { Database } from '~/utils/types/supabase.types'

const { toast } = useToast()

export const useQuizStore = defineStore('quizStore', {
  state: (): State => ({
    quizid: null,
    questions: [],
    current_question: { question: null, index: 0 },
    marked_as_later: [],
  }),
  getters: {
    GET_QUIZ_ID: state => state.quizid,
    GET_QUESTIONS: state => state.questions,
    GET_CURRENT_QUESTION: state => (questionIndex: number) => {
      return questionIndex >= 0 && questionIndex < state.questions.length
        ? state.questions[questionIndex]
        : null
    },
    GET_MARKED_AS_LATER: state => state.marked_as_later,
  },
  actions: {
    async SET_QUIZ_ID(id: string) {
      this.quizid = id
    },
    async SET_QUESTIONS(questions: QuizQuestion[]) {
      this.questions = questions
    },
    async TOGGLE_MARKED_AS_LATER(index: number) {
      this.marked_as_later.includes(index) ? this.marked_as_later.splice(this.marked_as_later.indexOf(index), 1) : this.marked_as_later.push(index)
    },
    async SET_CURRENT_QUESTIONS({ index, question }: { index: number; question: QuizQuestion }) {
      this.current_question.index = index
      this.current_question.question = question
    },
    async SET_QUESTION_ANSWERS({ index, answers }: { index: number; answers: UserAnswer[] }) {
      if (index >= 0 && index < this.questions.length)
        this.questions[index].submitted_answers = answers
    },
    async FETCH_QUIZZE({ quizId }: { quizId: string }) {
      const client = useSupabaseClient<Database>()

      if (!quizId) {
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
        .eq('id', quizId)
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
    async FETCH_QUIZZE_QUESTIONS({ ids }: { ids: string[] }) {
      const client = useSupabaseClient<Database>()
      const { data, error } = await client
        .from('question_bank')
        .select('id, category, question, view_only_answers')
        .in('id', ids)

      if (error) {
        toast({
          description: error.message,
          variant: 'destructive',
          duration: 4000,
        })
        throw error
      }

      return data
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
