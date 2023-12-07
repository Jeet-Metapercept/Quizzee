<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
</script>

<template>
  <pre>User ID: {{ route.params }}</pre>
</template>
