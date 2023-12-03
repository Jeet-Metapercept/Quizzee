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

interface Props {
  questions?: QuestionRow[]
  selectable?: boolean
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  questions: () => [],
  selectable: false,
  loading: false,
})
const emit = defineEmits(['onSelection'])

const selected_questions = ref<QuestionRow[]>([])
function handleChange(question: QuestionRow, checked: boolean) {
  if (checked)
    selected_questions.value.push(question)
  else
    selected_questions.value = selected_questions.value.filter(q => q !== question)

  emit('onSelection', selected_questions.value)
}
</script>

<template>
  <div>
    <div v-if="!loading" class="mt-4">
      <Table>
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
          <TableRow v-for="(question, i) in props.questions" :key="i">
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
    </div>
    <div v-else class="h-[50px] flex items-center mt-4 ">
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
