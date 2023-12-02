<script setup lang="ts">
import QuizCard from './components/Card.vue'
import SelectionSheet from './components/Selection.vue'

const project = useRuntimeConfig().public.PROJECT_NAME

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="mx-auto max-w-7xl w-full p-6 lg:p-0 md:max-w-lg">
      <div class="w-full border rounded-lg border-slate-300 shadow-sm">
        <div class="flex h-8 w-full items-center rounded-t-lg bg-slate-100">
          <div class="ml-6 flex space-x-2">
            <div class="h-3 w-3 rounded-full bg-red-500" /><div class="h-3 w-3 rounded-full bg-amber-500" /><div class="h-3 w-3 rounded-full bg-emerald-500" />
          </div><p class="ml-4 flex w-full justify-between font-mono text-sm text-slate-400">
            Question 1
          </p>
          <div class="flex items-center">
            <Icon name="radix-icons:star" class="mr-2 cursor-pointer text-muted-foreground" />
            <Icon name="radix-icons:enter-full-screen" class="mr-2 cursor-pointer text-muted-foreground" />
            <button class="inline-flex items-center border appearance-none font-medium rounded-md relative hover:text-slate-600 focus:outline-none dark:text-slate-700 dark:hover:text-slate-500 py-0.2 mr-2 bg-white px-2 font-sans text-sm text-slate-500">
              Restart
              <Icon name="radix-icons:reload" class="ml-2 cursor-pointer text-muted-foreground" />
            </button>
          </div>
        </div>
        <QuizCard />
      </div>
      <div class="mt-8">
        <a class="mb-5 mt-2 flex justify-center"><p class="text-signature text-xs">Powered by <b><span class="text-info-text hover:text-heading">{{ project }}</span></b></p></a><div class="bg-accent-bg h-2 w-full rounded-full">
          <div class="transition-width bg-brand z-20 h-2 rounded-full duration-500" style="width: 16%;" />
        </div>
      </div>
    </div>
    <SelectionSheet class="w-full absolute bottom-0 lg:w-[800px] lg:mx-auto" />
  </div>
</template>
