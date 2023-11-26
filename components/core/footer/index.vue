<script setup lang="ts">
import { usePageviewStore } from '@/stores/pageview'

const project = useRuntimeConfig().public.PROJECT_NAME
const version = useRuntimeConfig().public.PROJECT_VERSION
</script>

<template>
  <div class="border-t">
    <div class="flex h-16 justify-between items-center px-4">
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-700 dark:text-gray-300">© {{ new Date().getFullYear() }} {{ project }} Inc.</span>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-sm text-gray-700 dark:text-gray-300">v{{ version }}</span>
      </div>
    </div>
  </div>
</template>
