<script setup lang="ts">
import RadialProgress from '~/components/RadialProgress.vue'
import { useQuizStore } from '~/stores/quiz'
import { Badge } from '@/components/ui/badge'

const QUIZ_STORE = useQuizStore()

const quizView = computed(() => QUIZ_STORE.GET_QUIZ_STATUS)

const completedSteps = ref(0)
const totalSteps = ref(10)
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center p-4">
        <div class="flex flex-col items-center justify-center mx-auto">
          <label for="congratulations" class="text-heading mb-4 block text-base font-semibold leading-6">
            <div class="text-muted-foreground">Congratulations!</div>
          </label>
          <!-- <label for="error" class="text-muted-foreground block text-sm font-normal leading-6">Your Score</label> -->
        </div>

        <div class="text-brand flex flex-col items-center justify-center gap-3">
          <RadialProgress
            variant="orange"
            text="4/10"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
          />

          <div class="flex items-center gap-2 justify-center">
            <Badge variant="secondary" class="text-green-500">
              <Icon name="tabler:check" class="me-1 w-4 h-4" /> Correct {{ 23 }}
            </Badge>
            <Badge variant="secondary" class="text-red-500">
              <Icon name="radix-icons:cross-2" class="me-1 w-4 h-4" /> Wrong {{ 3 }}
            </Badge>
          </div>
        </div>

        <div class="w-full my-4 mb-5">
          <label class="block font-mono text-xs text-slate-400 border-b border-dashed">
            <div class="flex items-center justify-center py-1.5 px-4 text-center">
              <!-- <span>Score</span> -->
            </div>
          </label>
        </div>

        <div class="flex flex-col items-center justify-center mx-auto">
          <label for="error" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center justify-center" @click="++completedSteps">You have missed {{ quizView }} out of 10 questions</div>
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
