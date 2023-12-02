<script setup lang="ts">
import { Button } from '@/components/ui/button'

definePageMeta({
  layout: 'app-layout',
})
const router = useRouter()
const page = {
  title: 'Quiz Bank',
  sub: 'A collection of quizzes.',
}
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 lg:p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ page.title }}
        </h2>
        <p class="text-muted-foreground">
          {{ page.sub }}
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <Button class="lg:w-36" @click="router.push('/questionbank/new')">
          <Icon name="radix-icons:plus-circled" class="mr-2 h-4 w-4" />New
        </Button>
      </div>
    </div>
  </div>
</template>
