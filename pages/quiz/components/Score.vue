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
      <div class="text-center">
        <div class="flex flex-col items-center justify-center mx-auto">
          <label for="error" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center  justify-center">Score Card</div>
          </label>
          <label for="error" class="text-muted-foreground block text-sm font-normal leading-6">Test Results</label>
        </div>

        <div class="text-brand flex flex-col items-center justify-center">
          <RadialProgress
            variant="orange"
            text="4/10"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
          />
          <div class="flex items-center gap-2 justify-center">
            <Badge variant="secondary" class="text-primary">
              <Icon name="tabler:circle-filled" class="me-1" /> Attended {{ 23 }}
            </Badge>
            <Badge variant="secondary" class="text-green-500">
              <Icon name="tabler:circle-filled" class="me-1" /> Attended {{ 23 }}
            </Badge>
            <Badge variant="secondary" class="text-orange-500">
              <Icon name="tabler:circle-filled" class="me-1" /> Unattended {{ 3 }}
            </Badge>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center mx-auto">
          <label for="error" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center  justify-center" @click="++completedSteps">Not Found -- {{ quizView }}</div>
          </label>
          <label for="error" class="text-muted-foreground block text-sm font-normal leading-6">Sorry, quiz no longer available or expired.</label>
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
