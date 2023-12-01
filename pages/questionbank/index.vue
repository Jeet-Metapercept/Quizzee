<script setup lang="ts">
import type { QuestionRow } from '../../utils/types/types'

// import questions from './data/questions.json'
import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'
import type { Question } from './data/schema'
import { Button } from '@/components/ui/button'
import { useQuestionStore } from '@/stores/questionbank'

const router = useRouter()
definePageMeta({
  layout: 'app-layout',
})

const questions_bank = ref<Question[]>([])
const STORE = useQuestionStore()

onMounted(async () => {
  const data = await STORE.FETCH_QUESTIONS()
  if (data) {
    // console.log(data)
    questions_bank.value = data as any
    console.log(questions_bank.value)
    // console.log(questions_bank.value)
  }
},
)
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 lg:p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Question Bank
        </h2>
        <p class="text-muted-foreground">
          A collection of questions.
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <Button class="w-48" @click="router.push('/questionbank/new')">
          <Icon name="radix-icons:plus-circled" class="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>
    </div>
    <DataTable :data="questions_bank" :columns="columns" />
  </div>
</template>
