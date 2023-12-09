<script setup lang="ts">
import type { QuizViewState } from '../helper'
import type { QuizRow } from '~/utils/types/quiz.types'
import { useQuizStore } from '~/stores/quiz'
import type { ResultRow, SubmissionAnswer, SubmissionItem } from '~/utils/types/result.types'

const props = defineProps<Props>()
const status = defineModel<QuizViewState>('status', { default: 'submit' })
interface Props {
  quiz?: QuizRow
}
const user = useSupabaseUser()
const QUIZ_STORE = useQuizStore()

function submitResult() {
  const attended = QUIZ_STORE.GET_ATTENDED_QUESTIONS
  const unattended = QUIZ_STORE.GET_UNATTENDED_QUESTIONS
  const meta = QUIZ_STORE.GET_QUIZ_META
  const endDate = meta.ended_at ? new Date(meta.ended_at.toString()) : null
  const startDate = meta.started_at ? new Date(meta.started_at.toString()) : null
  const time = endDate && startDate
    ? (endDate.getTime() - startDate.getTime()) / 60000
    : 0

  const submission: SubmissionItem[] = QUIZ_STORE.GET_QUESTIONS.map(item => ({
    question_id: item.id,
    submitted_answers: (item.submitted_answers ?? []).map(answer => ({
      is_selected: answer.is_selected ?? false,
      text: answer.text,
    })),
  }))

  const result: ResultRow = {
    quiz_id: props.quiz?.id || '',
    quiz_name: props.quiz?.name,
    started_at: meta.started_at ? new Date(meta.started_at).toISOString() : null,
    ended_at: meta.ended_at ? new Date(meta.ended_at).toISOString() : null,
    time_taken: Number(time.toFixed(2)),
    on_background: meta.leave_count,
    max_q: props.quiz?.size,
    attended,
    unattended,
    // correct: 26,
    // incorrect: 4,
    // precentage: 87.45,
    user: user.value?.email,
    // result_link: 'https link',
    submission: submission || [],
  }

  QUIZ_STORE.PUSH_RESULT({ resultRow: result })
}
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-brand flex items-center justify-center">
          <!-- <transition-fade> -->
          <Icon v-if="status === 'complete'" name="radix-icons:check-circled" class="w-24 h-24 text-green-600 rounded-full" />
          <Icon v-else name="line-md:loading-twotone-loop" class="w-24 h-24 text-green-600 rounded-full" />
          <!-- </transition-fade> -->
        </div>
        <span class="bg-slate-300 mb-[10px] inline-block h-1 w-16 rounded-[100%]" />
        <div>
          <label for="thankYouCard" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center  justify-center" @click="submitResult">That's a wrap!</div>
          </label><label for="thankYouCard" class="text-muted-foreground block text-sm font-normal leading-6">We appreciate your participation.</label>
        </div>
      </div>
    </div>
  </div>
</template>
