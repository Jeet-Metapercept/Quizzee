<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
console.log(route.params)
</script>

<template>
  <pre>User ID: {{ route.params }}</pre>
</template>
