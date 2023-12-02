<script setup lang="ts">
// import questions from './data/questions.json'
import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'
import type { Question } from './data/schema'
import { Button } from '@/components/ui/button'
import { useQuestionStore } from '@/stores/questionbank'

definePageMeta({
  layout: 'app-layout',
})

const router = useRouter()
const page = {
  title: 'Question Bank',
  sub: 'A collection of questions.',
}
const questions_bank = ref<Question[]>([])
const STORE = useQuestionStore()

onMounted(async () => {
  const data = await STORE.FETCH_QUESTIONS()
  if (data)
    questions_bank.value = data as any
},
)
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 lg:p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ page.title }}
        </h2>
        <p class="text-muted-foreground">
          {{ page.sub }}
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <Button class="lg:w-48" @click="router.push('/questionbank/new')">
          <Icon name="radix-icons:plus-circled" class="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>
    </div>
    <DataTable :data="questions_bank" :columns="columns" />
  </div>
</template>
