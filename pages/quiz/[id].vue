<script setup lang="ts">
import QuestionCard from './components/Question.vue'
import CompleteCard from './components/Complete.vue'
import PrepareCard from './components/Prepare.vue'
import ErrorCard from './components/Error.vue'
import SelectionSheet from './components/Selection.vue'
import type { QuizViewState } from './helper'
import { getValidQuizIdFromRouteParam } from './helper'
import type { QuizRow } from '~/utils/types/quiz.types'
import { useQuizStore } from '~/stores/quiz'
import type { QuizQuestion } from '~/stores/quiz/types'

const route = useRoute()
const project = useRuntimeConfig().public.PROJECT_NAME
const url = useRuntimeConfig().public.BASEURL
const QUIZ_STORE = useQuizStore()
definePageMeta({
  layout: 'default',
})

const quizView = ref<QuizViewState>('pre')
const quiz = ref<QuizRow>()
const quizId = getValidQuizIdFromRouteParam(route.params.id)

async function prepareQuestions(ids: string[]) {
  const questions = await QUIZ_STORE.FETCH_QUIZZE_QUESTIONS({ ids }).catch(() => quizView.value = 'error') as unknown as QuizQuestion[]

  const questionsWithSubmittedAnswer = questions.map(item => ({
    ...item,
    submitted_answers: item.view_only_answers.map(answer => ({
      ...answer,
      is_selected: false,
    })),
  }))

  await QUIZ_STORE.SET_QUESTIONS(questionsWithSubmittedAnswer)
  quizView.value = 'ready'
}

async function prepareQuiz(quizId: string) {
  const response = await QUIZ_STORE.FETCH_QUIZZE({ quizId }).catch(() => quizView.value = 'error') as QuizRow
  quiz.value = response
  await QUIZ_STORE.SET_QUIZ_ID(quizId)

  await prepareQuestions(quiz.value.questions!)
}

onMounted(async () => {
  if (!quizId) {
    quizView.value = 'error'
    return
  }

  await prepareQuiz(quizId)
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="mx-auto max-w-7xl w-full p-6 lg:p-0 md:max-w-lg">
      <!-- {{ quiz }} -->
      <div class="w-full border rounded-lg border-slate-300 shadow-sm">
        <div class="flex h-8 w-full items-center rounded-t-lg bg-slate-100">
          <div class="ml-6 flex space-x-2">
            <div class="h-3 w-3 rounded-full bg-red-500" /><div class="h-3 w-3 rounded-full bg-amber-500" /><div class="h-3 w-3 rounded-full bg-emerald-500" />
          </div><p class="ml-4 flex w-full justify-between font-mono text-sm text-slate-400" />
          <div class="flex items-center">
            <Icon name="radix-icons:star" class="mr-2 cursor-pointer text-muted-foreground" @click="quizView = 'complete'" />
            <Icon name="radix-icons:enter-full-screen" class="mr-2 cursor-pointer text-muted-foreground" />
            <SelectionSheet />
          </div>
        </div>

        <!-- Pre -->
        <PrepareCard v-if="quizView === 'pre' || quizView === 'ready'" v-model:status="quizView" class="h-[550px]" :quiz="quiz" />

        <!-- Quiz -->
        <transition-fade v-else-if="quizView === 'in-process'" appear>
          <QuestionCard />
        </transition-fade>

        <!-- Complete -->
        <transition-fade v-else-if="quizView === 'complete'" appear>
          <CompleteCard class="h-[550px]" />
        </transition-fade>

        <!-- Error -->
        <transition-fade v-else appear>
          <ErrorCard class="h-[550px]" />
        </transition-fade>
      </div>

      <div class="mt-8">
        <a class="mb-5 mt-2 flex justify-center" :href="url"><p class="text-signature text-xs">Powered by <b><span class="text-info-text hover:text-heading">{{ project }}</span></b></p></a><div class="bg-accent-bg h-2 w-full rounded-full">
          <div class="transition-width bg-brand z-20 h-2 rounded-full duration-500" style="width: 16%;" />
        </div>
      </div>
    </div>
  </div>
</template>
