<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useQuizStore } from '~/stores/quiz'

const QUIZ_STORE = useQuizStore()

// const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const

const current_question_index = defineModel<number>('current_question', { default: 0 })

const questions_numbers = computed(() => Array.from(QUIZ_STORE.GET_QUESTIONS.keys()))

function pickQuestion(q: number) {
  // console.log(q)
  current_question_index.value = q
}
</script>

<template>
  <div class="grid">
    <!-- <Sheet v-for="side in SHEET_SIDES" :key="side"> -->
    <Sheet>
      <SheetTrigger as-child>
        <button class="inline-flex items-center border appearance-none  rounded-md relative hover:text-slate-600 focus:outline-none dark:text-slate-700 dark:hover:text-slate-500 py-0.2 mr-2 bg-white px-2 font-sans text-sm text-slate-500">
          Switch
          <Icon name="tabler:status-change" class="ml-2 cursor-pointer text-muted-foreground" />
        </button>
        <!-- <Button variant="outline" class="w-full">Switch Question</Button> -->
      </SheetTrigger>
      <SheetContent side="bottom" class="lg:border lg:w-[800px] lg:mx-auto">
        <SheetHeader class="text-start">
          <SheetTitle>
            Switch to
          </SheetTitle>
          <SheetDescription>
            Jump to a question
          </SheetDescription>
        </SheetHeader>
        <div class="grid py-4">
          <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-2 bg-muted rounded p-2">
            <SheetClose v-for="(q, i) in questions_numbers" :key="i" as-child>
              <Button size="sm" :variant="current_question_index === q ? 'default' : 'outline'" type="submit" @click="pickQuestion(q)">
                <Icon :name="i % 3 ? 'tabler:circle' : 'tabler:circle-filled'" class="me-2" />{{ q + 1 }}
              </Button>
            </SheetClose>
          </div>
        </div>
        <SheetFooter class="md:items-center md:justify-between">
          <SheetClose as-child>
            <Button type="submit" variant="outline" class="lg:w-36">
              Close
            </Button>
          </SheetClose>

          <div class="py-2">
            <div class="flex gap-1">
              <Badge variant="secondary">
                <Icon name="tabler:circle" class="me-1" /> Unattended
              </Badge>
              <Badge variant="secondary">
                <Icon name="tabler:circle-filled" class="me-1" /> Attended
              </Badge>
              <Badge variant="secondary">
                <Icon name="tabler:circle-half-2" class="me-1" /> Marked as later
              </Badge>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
