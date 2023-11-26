<script setup lang="ts">
import Header from '@/components/core/header/index.vue'
import Footer from '@/components/core/footer/index.vue'
</script>

<template>
  <main class="flex flex-col h-screen">
    <Header />

    <div class="flex-1 py-10 px-10">
      <div class="">
        <slot />
      </div>
    </div>

    <Footer />
  </main>
</template>
