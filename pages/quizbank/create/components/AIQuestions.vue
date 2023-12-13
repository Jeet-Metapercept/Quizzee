<script setup lang="ts">
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
import { useQuestionStore } from '@/stores/questionbank'

const QUESTION_STORE = useQuestionStore()
const loading = ref(false)
const aiquestions = ref([{
  question: {
    text: 'q1',
  },
  category: 'random',
}])

async function generateQuestionAI() {
  loading.value = true
  const res = await QUESTION_STORE.AI_GENERATE_QUESTIONS({ message: 'Geopolotics Questions', category: 'Geopolotics', count: 2, difficulty: 1 })
  console.log(res)

  loading.value = false
}
</script>

<template>
  <div>
    <div v-if="!loading" class="mt-4">
      <Button @click="generateQuestionAI">
        FETCH
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Question
            </TableHead>
            <TableHead class="text-right">
              Category
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(question, i) in aiquestions" :key="i">
            <TableCell class="font-medium">
              <label :for="`question-list-${i}`" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{{ question.question.text }}</label>
            </TableCell>
            <TableCell class="text-right">
              <Badge variant="secondary">
                {{ question.category }}
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
