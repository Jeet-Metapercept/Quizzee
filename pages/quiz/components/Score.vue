<script setup lang="ts">
import RadialProgress from '~/components/RadialProgress.vue'
import { useQuizStore } from '~/stores/quiz'
import { Badge } from '@/components/ui/badge'

const QUIZ_STORE = useQuizStore()

const result = computed(() => QUIZ_STORE.GET_RESULT)
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center p-6">
        <div class="flex flex-col items-center justify-center mx-auto">
          <label for="congratulations" class="text-heading mb-4 block text-base font-semibold leading-6">
            <div class="text-muted-foreground">Congratulations!</div>
          </label>
          <!-- <label for="error" class="text-muted-foreground block text-sm font-normal leading-6">Your Score</label> -->
        </div>

        <div class="text-brand flex flex-col items-center justify-center gap-3">
          <RadialProgress
            variant="orange"
            :text="`${result?.correct || '?'}/${result?.max_q || '?'}`"
            :completed-steps="result?.correct || 0"
            :total-steps="result?.max_q || 0"
          />

          <div class="flex items-center gap-2 justify-center">
            <Badge variant="secondary" class="text-green-500">
              <Icon name="tabler:check" class="me-1 w-4 h-4" /> Correct {{ result?.correct || '?' }}
            </Badge>
            <Badge variant="secondary" class="text-red-500">
              <Icon name="radix-icons:cross-2" class="me-1 w-4 h-4" /> Wrong {{ result?.incorrect || '?' }}
            </Badge>
          </div>
        </div>

        <div class="w-full my-4">
          <label class="block font-mono text-xs text-slate-400 border-t border-dashed">
            <div class="flex items-center justify-between pt-2.5 text-center">
              <span>Score</span>
              <span>{{ result?.percentage ? `${result?.percentage}%` : '?' }}</span>
            </div>
            <div class="flex items-center justify-between pt-1.5 text-center">
              <span>Time</span>
              <span>{{ result?.time_taken ? `${result?.time_taken}s` : '?' }}</span>
            </div>
          </label>
        </div>

        <div class="flex flex-col items-center justify-center mx-auto mt-6">
          <label for="error" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center justify-center">You have missed {{ result?.incorrect || '?' }} out of {{ result?.max_q || '?' }} questions</div>
          </label>
          <label for="error" class="text-muted-foreground block text-xs font-normal leading-6">You did a good job, Learn more by taking another quizze.</label>
        </div>

        <!-- <div class="w-fit">
          <RadialProgress
            variant="orange"
            text="4/10"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>
