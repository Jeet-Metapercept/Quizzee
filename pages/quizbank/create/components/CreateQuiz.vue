<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const faker = useFaker()
const isComplete = ref(false)
const isLoading = ref(false)

const quiz = ref({
  title: '',
  description: '',
})
</script>

<template>
  <div class="">
    <!-- <Button> new comp</Button> -->
    <Card v-if="!isComplete">
      <CardHeader>
        <CardTitle class="flex justify-between">
          Quiz <Button size="sm" variant="outline" :disabled="isLoading">
            <Icon
              name="radix-icons:question-mark-circled"
              class="mr-2 h-4 w-4"
            />
            Sample Quiz {{ faker.getUsers(1) }}
          </Button>
        </CardTitle>
        <CardDescription>Create a new quiz</CardDescription>
      </CardHeader>

      <Separator class="mb-8" />

      <CardContent class="grid gap-6 mt-2">
        <div class="grid gap-2">
          <Label for="title">Title</Label>
          <Input id="title" v-model="quiz.title" placeholder="Quiz Title" :disabled="isLoading" />
        </div>
        <div class="grid gap-2">
          <Label for="description">Description</Label>
          <Textarea
            id="description"
            v-model="quiz.description"
            placeholder="Please include all information relevant to your quiz."
            :disabled="isLoading"
          />
        </div>
      </CardContent>
    </Card>
  </div>
</template>