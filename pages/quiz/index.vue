<script setup lang="ts">
import QuizCard from './components/Card.vue'

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="mx-auto max-w-7xl w-full p-0 md:max-w-lg">
      <div class="w-full">
        <QuizCard />
      </div>
    </div>
  </div>
</template>
