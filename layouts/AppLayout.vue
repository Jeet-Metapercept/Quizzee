<script setup lang="ts">
import Header from '@/components/core/header/index.vue'
</script>

<template>
  <main>
    <Header />

    <div class="py-20 px-10 text-center">
      <slot />
      <!-- <Footer /> -->
      <div class="mt-5 mx-auto text-center opacity-25 text-sm">
        [Blank Layout]
      </div>
    </div>
  </main>
</template>
