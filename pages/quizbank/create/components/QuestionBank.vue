<script setup lang="ts">
import type { QuestionRow } from '@/utils/types/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuestionStore } from '@/stores/questionbank'

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
})
const questions_list = ref<QuestionRow[]>([])

const STORE = useQuestionStore()
interface Props {
  selectable?: boolean
}

onMounted(async () => {
  const data = await STORE.FETCH_QUESTIONS()
  if (data)
    questions_list.value = data as any
},
)
</script>

<template>
  <div>
    <h2 class="text-heading font-bold tracking-tight">
      Find Question
    </h2>
    <div class="mt-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead v-if="props.selectable" />
            <TableHead>
              Question
            </TableHead>
            <TableHead class="text-right">
              Category
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(question, i) in questions_list" :key="i">
            <TableCell v-if="props.selectable" class="font-medium pl-2">
              <Checkbox />
            </TableCell>
            <TableCell class="font-medium">
              {{ question.question.text }}
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
  </div>
</template>
