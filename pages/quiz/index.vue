<script setup lang="ts">
import QuizCard from './components/Card.vue'

const project = useRuntimeConfig().public.PROJECT_NAME

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="mx-auto max-w-7xl w-full p-0 md:max-w-lg">
      <div class="w-full border rounded-lg border-slate-300 shadow-sm">
        <div class="flex h-8 w-full items-center rounded-t-lg bg-slate-100">
          <div class="ml-6 flex space-x-2">
            <div class="h-3 w-3 rounded-full bg-red-500" /><div class="h-3 w-3 rounded-full bg-amber-500" /><div class="h-3 w-3 rounded-full bg-emerald-500" />
          </div><p class="ml-4 flex w-full justify-between font-mono text-sm text-slate-400">
            Question 1
          </p><div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="mr-2 h-4 w-4 cursor-pointer"><path fill-rule="evenodd" d="M15 3.75a.75.75 0 01.75-.75h4.5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0V5.56l-3.97 3.97a.75.75 0 11-1.06-1.06l3.97-3.97h-2.69a.75.75 0 01-.75-.75zm-12 0A.75.75 0 013.75 3h4.5a.75.75 0 010 1.5H5.56l3.97 3.97a.75.75 0 01-1.06 1.06L4.5 5.56v2.69a.75.75 0 01-1.5 0v-4.5zm11.47 11.78a.75.75 0 111.06-1.06l3.97 3.97v-2.69a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5h2.69l-3.97-3.97zm-4.94-1.06a.75.75 0 010 1.06L5.56 19.5h2.69a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-4.5a.75.75 0 011.5 0v2.69l3.97-3.97a.75.75 0 011.06 0z" clip-rule="evenodd" /></svg><button class="inline-flex items-center appearance-none font-medium rounded-md relative hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 dark:text-slate-700 dark:hover:text-slate-500 py-0.2 mr-2 bg-white px-2 font-sans text-sm text-slate-500">
              Restart<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="ml-2 h-4 w-4"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" /></svg>
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
  </div>
</template>
