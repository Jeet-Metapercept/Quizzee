<script setup lang="ts">
import type { QuizViewState } from '../helper'
import QOption from './Option.vue'
import { Button } from '@/components/ui/button'
import { useQuizStore } from '~/stores/quiz'
import type { QuizQuestion, UserAnswer } from '~/stores/quiz/types'

const status = defineModel<QuizViewState>('status', { default: 'in-process' })
const QUIZ_STORE = useQuizStore()
const total_questions = computed(() => QUIZ_STORE.GET_QUESTIONS.length)
const current_question_index = ref(0)
const current_question = ref<QuizQuestion | null>(null)
const current_question_options = ref<UserAnswer[]>([])
const is_last_question = computed(() => current_question_index.value === total_questions.value - 1)

function getCurrentQuestion(index: number) {
  const Q = QUIZ_STORE.GET_CURRENT_QUESTION(index)
  current_question.value = Q
  current_question_options.value = Q?.submitted_answers || []
}

getCurrentQuestion(current_question_index.value)

function nextQuestion() {
  if (!is_last_question.value)
    getCurrentQuestion(++current_question_index.value)
}

// Allow Multi Select
// function handleOptionSelected(selectedOption: OptionType & { index: number; is_selected: boolean }) {
//   options.value[selectedOption.index].is_selected = selectedOption.is_selected
// }

// Single Select
function handleOptionSelected(selectedOption: UserAnswer & { index: number; is_selected: boolean }) {
  current_question_options.value.forEach((option, i) => {
    option.is_selected = i === selectedOption.index ? selectedOption.is_selected : false
  })

  QUIZ_STORE.SET_QUESTION_ANSWERS({ index: current_question_index.value, answers: current_question_options.value })
}
</script>

<template>
  <div class="quizze-form">
    <div class="w-full">
      <div class="flex flex-col justify-between px-6 pb-3 pt-6">
        <div class="my-auto lg:p-8">
          <div class="w-full">
            <label class="block font-mono text-xs text-slate-400 border-b border-dashed mt-4 mb-4">
              <div class="flex items-center justify-between py-1.5">
                <span>Question</span>
                <span>{{ `${current_question_index + 1}/${total_questions}` }}</span>
              </div>
            </label>

            <label class="text-heading block text-base font-semibold leading-6">
              <div class="flex items-center justify-between">{{ current_question?.question.text }}</div>
            </label>
            <label class="text-muted-foreground block text-xs font-normal leading-6">Single selection</label>
            <div class="mt-4">
              <fieldset>
                <legend class="sr-only">
                  Options
                </legend>
                <transition-slide>
                  <div class="bg-survey-bg relative max-h-[42vh] space-y-2 overflow-y-auto rounded-md py-0.5">
                    <QOption v-for="(option, i) in current_question_options" :key="i" :icon="`tabler:letter-${String.fromCharCode(97 + i)}`" :option="option" :index="i" @selected="handleOptionSelected" />
                  </div>
                </transition-slide>
              </fieldset>
            </div>
            <div class="flex w-full justify-between mt-auto">
              <Button v-if="is_last_question" variant="default" class="w-full mt-6" @click="status = 'complete'">
                Submit
                <Icon name="radix-icons:arrow-right" class="ms-2 " />
              </Button>

              <Button v-else variant="default" class="w-full mt-6" :disabled="is_last_question" @click="nextQuestion()">
                Next
                <Icon name="radix-icons:arrow-right" class="ms-2 " />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
