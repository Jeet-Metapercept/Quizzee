<script setup lang="ts">
import { transparent } from '@unovis/ts/components/chord-diagram/style'
import RadialProgress from 'vue3-radial-progress'
import { useQuizStore } from '~/stores/quiz'

const QUIZ_STORE = useQuizStore()

const quizView = computed(() => QUIZ_STORE.GET_QUIZ_STATUS)

const completedSteps = ref(0)
const totalSteps = ref(10)
// startColor	string	'#00C58E'	Sets the start color of the inner stroke (gradient).
// stopColor	string	'#00E0A1'	Sets the end color of the inner stroke (gradient).
// innerStrokeColor	string	'#2F495E'	Sets the color of the inner stroke to be applied to the shape.

const green = {
  100: 'rgb(220 252 231)',
  400: 'rgb(74 222 128)',
  500: 'rgb(34 197 94)',
}
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-brand flex items-center justify-center">
          <Icon name="radix-icons:info-circled" class="w-24 h-24 text-red-600 rounded-full" />
        </div>
        <span class="bg-slate-300 mb-[10px] inline-block h-1 w-16 rounded-[100%]" />
        <div class="flex flex-col items-center justify-center mx-auto">
          <label for="error" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center  justify-center" @click="++completedSteps">Not Found -- {{ quizView }}</div>
          </label>
          <label for="error" class="text-muted-foreground block text-sm font-normal leading-6">Sorry, quiz no longer available or expired.</label>
        </div>

        <div class="w-fit">
          <RadialProgress
            :diameter="107"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
            :stroke-width="8"
            inner-stroke-color="transparent"
            :start-color="green[400]"
            :stop-color="green[400]"
          >
            <div class="bg-green-100 rounded-full h-24 w-24 -z-10 flex items-center justify-center">
              <span class="font-semibold font-mono text-2xl tracking-wide text-green-800">
                {{ completedSteps / totalSteps }}
              </span>
            </div>
          </RadialProgress>
        </div>
      </div>
    </div>
  </div>
</template>
