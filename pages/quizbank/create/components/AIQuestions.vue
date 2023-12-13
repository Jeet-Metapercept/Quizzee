<script setup lang="ts">
import Questions from './QuestionBank.vue'
import type { QuestionRow } from '@/utils/types/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface AIQuizQuestion {
  question: {
    text: string
    description: string
    reference: string
  }
  answers: {
    text: string
    is_correct: boolean
  }[]
  category: string
  difficulty: number
  tags: string[]
}

const loading = ref(false)
const aiquestions = ref<QuestionRow[]>([])

async function generateQuestionAI() {
  loading.value = true
  const params = { message: 'Geopolotics Questions', category: 'Geopolotics', count: 2, difficulty: 1 }

  const { data, error } = await useFetch<{ response: Array<AIQuizQuestion> }>('/api/ai/generate/questions', {
    body: params,
    method: 'post',
  })

  if (error.value)
    console.error(error.value)

  if (data.value) {
    const questionRowQuestions: QuestionRow[] = data.value?.response.map((q) => {
      return {
        ...q,
        author: 'ai@quizzee.com',
        view_only_answers: q.answers.map(a => ({ text: a.text })),
      }
    })

    aiquestions.value = questionRowQuestions
  }

  loading.value = false
}

const selected_ai_questions = ref<QuestionRow[]>([])
function handleSelectedQuestions(questions: QuestionRow[]) {
  selected_ai_questions.value = questions
}
</script>

<template>
  <div>
    <div v-if="!loading" class="mt-4">
      <Button @click="generateQuestionAI">
        FETCH
      </Button>
      <div class="grid gap-2">
        <Questions :selectable="true" :max="Number(10)" :loading="loading" :questions="aiquestions" @on-selection="handleSelectedQuestions" />
      </div>
    </div>
    <div v-else class="h-[50px] flex items-center mt-4">
      <Icon
        name="svg-spinners:180-ring"
        class="mr-2 h-4 w-4"
      />
      <p class="text-sm">
        loading...
      </p>
    </div>
  </div>
</template>
