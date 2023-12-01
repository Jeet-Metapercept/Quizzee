<script setup lang="ts">
import { usePageviewStore } from '@/stores/pageview'
import { Toggle } from '@/components/ui/toggle'

definePageMeta({
  layout: 'default',
})

const VIEWS = usePageviewStore()
VIEWS.incrementView()
VIEWS.updateLastSeen()
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="mx-auto max-w-7xl w-full p-0 md:max-w-lg">
      <div class="w-full">
        <div class="formbricks-form w-full">
          <div class="w-full">
            <div class="flex flex-col justify-between bg-[--fb-survey-background-color] px-6 pb-3 pt-6">
              <div class="my-auto">
                <form class="w-full">
                  <label class="text-heading mb-1.5 block text-base font-semibold leading-6">
                    <div class="flex items-center mr-[3ch] justify-between">What is Speed of Light</div>
                  </label>
                  <label class="text-subheading block text-sm font-normal leading-6">Can't do both.</label>
                  <div class="mt-4">
                    <fieldset>
                      <legend class="sr-only">
                        Options
                      </legend>
                      <div role="radiogroup" class="bg-survey-bg relative max-h-[42vh] space-y-2 overflow-y-auto rounded-md py-0.5 pr-2">
                        <Toggle size="lg" variant="outline" aria-label="Toggle italic">
                          299 792 458 m / s
                        </Toggle>
                        <label tabindex="1" class="border-border-highlight bg-accent-selected-bg z-10 text-heading focus-within:border-border-highlight focus-within:bg-accent-bg hover:bg-accent-bg relative flex cursor-pointer flex-col rounded-md border p-4 focus:outline-none">
                          <span class="flex items-center text-sm">
                            <input type="radio" name="speed_of_light" value="299 792 458 m / s">
                            <span class="ml-3 font-medium">299 792 458 m / s</span>
                          </span>
                        </label>
                        <label tabindex="2" class="border-border text-heading focus-within:border-border-highlight focus-within:bg-accent-bg hover:bg-accent-bg relative flex cursor-pointer flex-col rounded-md border p-4 focus:outline-none">
                          <span class="flex items-center text-sm">
                            <input type="radio" name="speed_of_light" value="399 792 458 m / s">
                            <span class="ml-3 font-medium">399 792 458 m / s</span>
                          </span>
                        </label>
                        <label tabindex="3" class="border-border text-heading focus-within:border-border-highlight focus-within:bg-accent-bg hover:bg-accent-bg relative flex cursor-pointer flex-col rounded-md border p-4 focus:outline-none">
                          <span class="flex items-center text-sm">
                            <input type="radio" name="speed_of_light" value="299 297 458 m / s">
                            <span class="ml-3 font-medium">299 297 458 m / s</span>
                          </span>
                        </label>
                        <label tabindex="4" class="border-border text-heading focus-within:border-border-highlight focus-within:bg-accent-bg hover:bg-accent-bg relative flex cursor-pointer flex-col rounded-md border p-4 focus:outline-none">
                          <span class="flex items-center text-sm">
                            <input type="radio" name="speed_of_light" value="299 792 854 m / s">
                            <span class="ml-3 font-medium">299 792 854 m / s</span>
                          </span>
                        </label>
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
      </div>
    </div>
  </div>
</template>
