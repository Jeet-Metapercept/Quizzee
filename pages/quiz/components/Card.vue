<script setup lang="ts">
import QOption from './Option.vue'
import { Button } from '@/components/ui/button'

export interface OptionType {
  option: string
  is_selected: boolean
}
const options = ref<OptionType[]>([
  { option: '299,792,458 meters per second', is_selected: false },
  { option: '299,792,458,000 meters per second', is_selected: false },
  { option: '299,792,458 kilometers per second', is_selected: false },
  { option: '186,282 miles per second', is_selected: false },
])

setTimeout(() => {
  options.value[0].is_selected = true
}, 5000)

// function handleOptionSelected(selectedOption: OptionType & { index: number; is_selected: boolean }) {
//   options.value[selectedOption.index].is_selected = selectedOption.is_selected
// }

// Single Select
function handleOptionSelected(selectedOption: OptionType & { index: number; is_selected: boolean }) {
  options.value.forEach((option, i) => {
    option.is_selected = i === selectedOption.index ? selectedOption.is_selected : false
  })
}
</script>

<template>
  <div class="quizze-form w-full">
    <div class="w-full">
      <div class="flex flex-col justify-between px-6 pb-3 pt-6">
        <div class="my-auto lg:p-8">
          <div class="w-full">
            <!-- <label class="mb-1.5 block text-base font-semibold leading-6">
              <div class="flex items-center mr-[3ch] justify-start text-2xl">
                <span class="font-semibold">Question 1</span>
                <span class="text-sm ml-1 mt-1 text-muted-foreground">/</span>
                <span class="text-sm mt-2 text-muted-foreground">10</span>
              </div>
            </label> -->

            <label class="text-xs block text-muted-foreground font-semibold border-b border-dashed mt-4 mb-4">
              <div class="flex items-center justify-between py-1.5">
                <span>Question</span>
                <span> 1/10</span>
              </div>
            </label>

            <label class="text-heading mb-1.5 block text-base font-semibold leading-6">
              <div class="flex items-center justify-between">What is Speed of Light</div>
            </label>
            <label class="text-subheading block text-sm font-normal leading-6">Can't do both.</label>
            <div class="mt-4">
              <fieldset>
                <legend class="sr-only">
                  Options
                </legend>
                <transition-slide>
                  <div class="bg-survey-bg relative max-h-[42vh] space-y-2 overflow-y-auto rounded-md py-0.5">
                    <QOption v-for="(option, i) in options" :key="i" :icon="`tabler:letter-${String.fromCharCode(97 + i)}`" :option="option" :index="i" @selected="handleOptionSelected" />
                  </div>
                </transition-slide>
              </fieldset>
            </div>
            <div class="mt-6 flex w-full justify-between">
              <Button variant="outline" class="lg:w-24">
                Back
              </Button>
              <Button variant="default" class="lg:w-24">
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
