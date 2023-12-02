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
  title: faker.generateQuizName(),
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
            Sample Quiz
          </Button>
        </CardTitle>
        <CardDescription>Create a new quiz</CardDescription>
      </CardHeader>

      <Separator class="mb-8" />

      <CardContent class="grid gap-6 mt-2">
        <div class="grid gap-2">
          <Label for="title" class="flex items-center justify-between">Title <Icon name="radix-icons:update" class="ms-1 w-3 h-3 cursor-pointer" @click="quiz.title = faker.generateQuizName()" /></Label>
          <Input id="title" v-model="quiz.title" placeholder="Quiz Title" :disabled="isLoading" />
        </div>
        <div class="flex gap-4 items-start">
          <div class="w-[110px] h-[110px] flex items-center justify-center rounded border cursor-pointer">
            <!-- <Icon name="material-symbols:add-photo-alternate-outline" class="w-12 h-12 text-slate-200" /> -->
            <NuxtImg
              alt="quiz-logo"
              :src="`https://api.dicebear.com/7.x/shapes/svg?seed=${quiz.title}`"
              class="block rounded"
              :height="110"
              :width="110"
            />
          </div>

          <div class="flex flex-col flex-grow">
            <Label for="description" class="mb-2">Description</Label>
            <Textarea
              id="description"
              v-model="quiz.description"
              placeholder="Please include all information relevant to your quiz."
              :disabled="isLoading"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
