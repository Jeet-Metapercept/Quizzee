<script setup lang="ts">
import type { QuestionRow } from '@/utils/types/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuestionStore } from '@/stores/questionbank'

interface Props {
  selectable?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  selectable: false,
})
const emit = defineEmits(['onSelection'])

const questions_list = ref<QuestionRow[]>([])
const STORE = useQuestionStore()

const selected_questions = ref<QuestionRow[]>([])
function handleChange(question: QuestionRow, checked: boolean) {
  if (checked)
    selected_questions.value.push(question)
  else
    selected_questions.value = selected_questions.value.filter(q => q !== question)

  emit('onSelection', selected_questions.value)
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
    <div class="mt-4">
      <!-- <ScrollArea class="h-[400px] rounded-md border"> -->
      <Table class="h-[200px]">
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
              <Checkbox :checked="selected_questions.includes(question)" @update:checked="checked => handleChange(question, checked)" />
            </TableCell>
            <TableCell class="font-medium">
              {{ question.question.text }}
            </TableCell>
            <TableCell class="text-right">
              <Badge variant="secondary" class="truncate">
                {{ question.category }}
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <!-- </ScrollArea> -->
    </div>
  </div>
</template>
