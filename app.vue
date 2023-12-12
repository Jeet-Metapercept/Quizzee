<script setup lang="ts">
import Toaster from '@/components/ui/toast/Toaster.vue'

const project = useRuntimeConfig().public.PROJECT_NAME
const host = useRuntimeConfig().public.BASEURL

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-16x16.png',
    },
  ],
})
useSeoMeta({
  title: project,
  ogTitle: project,
  description: `Powered by ${project}`,
  ogDescription: `Powered by ${project}`,
  ogImage: `${host}android-chrome-512x512.png`,
  ogUrl: host,
  twitterTitle: project,
  twitterDescription: `Powered by ${project}`,
  twitterImage: `${host}android-chrome-512x512.png`,
  twitterCard: 'summary',
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
  <Toaster />
</template>
