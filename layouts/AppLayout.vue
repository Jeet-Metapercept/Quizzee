<script setup lang="ts">
import Header from '@/components/core/header/index.vue'
import Footer from '@/components/core/footer/index.vue'
</script>

<template>
  <main class="flex flex-col h-screen">
    <Header />

    <div class="flex-1 py-20 px-10 text-center">
      <slot />
      <!-- <Footer /> -->
      <div class="mt-5 mx-auto text-center opacity-25 text-sm">
        [Blank Layout]
      </div>
    </div>

    <Footer />
  </main>
</template>
