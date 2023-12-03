<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useQuestionStore } from '@/stores/questionbank'

const STORE = useQuestionStore()

onMounted(() => STORE.FETCH_CATEGORIES())
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
