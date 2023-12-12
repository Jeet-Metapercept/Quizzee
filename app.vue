<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useQuestionStore } from '@/stores/questionbank'

const project = useRuntimeConfig().public.PROJECT_NAME
const host = useRuntimeConfig().public.BASEURL
useSeoMeta({
  title: project,
  ogTitle: project,
  description: `Powered by ${project}`,
  ogDescription: `Powered by ${project}`,
  ogImage: `${host}/android-chrome-512x512.png`,
})

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
