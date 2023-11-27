<script setup lang="ts">
import tasks from './data/tasks.json'
import DataTable from './components/DataTable.vue'
import { columns } from './components/columns'
import { Button } from '@/components/ui/button'

const router = useRouter()

definePageMeta({
  layout: 'app-layout',
})
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">
          Question Bank
        </h2>
        <p class="text-muted-foreground">
          A collection of questions.
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <Button @click="router.push('/questionbank/new')">
          <Icon name="radix-icons:plus-circled" class="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>
    </div>
    <DataTable :data="tasks" :columns="columns" />
  </div>
</template>
