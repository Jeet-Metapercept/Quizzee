<script setup lang="ts">
const project = useRuntimeConfig().public.PROJECT_NAME
const version = useRuntimeConfig().public.PROJECT_VERSION
</script>

<template>
  <div class="border-t">
    <div class="flex h-12 justify-between items-center px-4">
      <div class="flex items-center space-x-4 text-muted-foreground">
        <span class="text-xs">© {{ new Date().getFullYear() }} {{ project }} Inc.</span>
      </div>
      <div class="flex items-center space-x-4 text-muted-foreground">
        <span class="text-xs">v{{ version }}</span>
      </div>
    </div>
  </div>
</template>
