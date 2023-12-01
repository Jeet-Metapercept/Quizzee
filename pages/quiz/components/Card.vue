<script setup lang="ts">
import QOption from './Option.vue'

export interface OptionType {
  option: string
  is_selected: boolean
}

const options = ref<OptionType[]>([
  { option: 'Option 1', is_selected: false },
  { option: 'Option 2', is_selected: false },
  { option: 'Option 3', is_selected: true },
  { option: 'Option 4', is_selected: false },
])

function handleOptionSelected(selectedOption: OptionType & { index: number; is_selected: boolean }) {
  options.value[selectedOption.index].is_selected = selectedOption.is_selected
}
</script>

<template>
  <div class="quizze-form w-full">
    <div class="w-full">
      <div class="flex flex-col justify-between px-6 pb-3 pt-6">
        <div class="my-auto  border-1 rounded border-dark-500 shadow-md p-4">
          <form class="w-full">
            {{ options }}
            <label class="text-heading mb-1.5 block text-base font-semibold leading-6">
              <div class="flex items-center mr-[3ch] justify-between">What is Speed of Light</div>
            </label>
            <label class="text-subheading block text-sm font-normal leading-6">Can't do both.</label>
            <div class="mt-4">
              <fieldset>
                <legend class="sr-only">
                  Options
                </legend>
                <div class="bg-survey-bg relative max-h-[42vh] space-y-2 overflow-y-auto rounded-md py-0.5 pr-2">
                  <QOption v-for="(option, i) in options" :key="i" :icon="`tabler:letter-${String.fromCharCode(97 + i)}`" :option="option" :index="i" @selected="handleOptionSelected" />

                  <!-- <label tabindex="4" class="border-border text-heading focus-within:border-border-highlight focus-within:bg-accent-bg hover:bg-accent-bg relative flex cursor-pointer flex-col rounded-md border p-4 focus:outline-none">
                          <span class="flex items-center text-sm">
                            <input type="radio" name="speed_of_light" value="299 792 854 m / s">
                            <span class="ml-3 font-medium">299 792 854 m / s</span>
                          </span>
                        </label> -->
                </div>
              </fieldset>
            </div>
            <div class="mt-4 flex w-full justify-between">
              <button type="button" class="border-back-button-border text-heading focus:ring-focus flex items-center rounded-md border px-3 py-3 text-base font-medium leading-4 shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2">
                Back
              </button>
              <div />
              <button type="submit" class="bg-brand border-submit-button-border text-on-brand focus:ring-focus flex items-center rounded-md border px-3 py-3 text-base font-medium leading-4 shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2">
                Finish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
