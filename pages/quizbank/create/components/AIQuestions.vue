<script setup lang="ts">
import Questions from './QuestionBank.vue'
import Placeholder from '@/components/EmptyPlaceholder.vue'
import type { QuestionRow } from '@/utils/types/types'
import { Button } from '@/components/ui/button'

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

interface Props {
  category?: string
  max?: number
}
const props = withDefaults(defineProps<Props>(), {
  max: 10,
  category: 'Random',
})
const emit = defineEmits(['onSelection'])

const loading = ref(false)
const aiquestions = ref<QuestionRow[]>([])

async function generateQuestionAI() {
  loading.value = true
  const params = { message: `Please generate quiz questions for category ${props?.category}`, category: props?.category, count: 2, difficulty: 1 }

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

  emit('onSelection', selected_ai_questions.value)
}
</script>

<template>
  <div>
    <Placeholder v-if="aiquestions.length === 0" icon="fluent:document-one-page-sparkle-20-regular" title="AI Assistant" text="create AI-powered questions easily" />

    <div class="grid gap-2 grid-cols-1">
      <Button :disabled="loading" @click="generateQuestionAI">
        <Icon :name="loading ? 'svg-spinners:blocks-wave' : 'material-symbols:magic-button'" class="me-2" />
        {{ loading ? 'Generating...' : selected_ai_questions.length ? `Generate Again` : `Generate` }}
      </Button>
    </div>

    <div v-if="aiquestions.length > 0" class="grid gap-2">
      <Questions :selectable="true" :max="Number(props.max)" :loading="loading" :questions="aiquestions" @on-selection="handleSelectedQuestions" />
    </div>
  </div>
</template>
