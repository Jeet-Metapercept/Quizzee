<script setup lang="ts">
import type { QuizViewState } from '../helper'
import { Button } from '@/components/ui/button'
import type { QuizRow } from '~/utils/types/quiz.types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

interface Props {
  status: QuizViewState
  quiz?: QuizRow
}
const props = defineProps<Props>()
const default_img = 'https://api.dicebear.com/7.x/initials/svg?seed=Quiz'
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-brand flex items-center justify-center">
          <Icon v-if="props.status !== 'ready'" name="svg-spinners:bouncing-ball" class="w-24 h-24 text-green-600 rounded-full" />
          <Avatar v-else class="h-12 w-12 mb-4">
            <AvatarImage
              :src="quiz?.image_url || default_img" alt="quiz-image"
            />
            <AvatarFallback>QZ</AvatarFallback>
          </Avatar>
        </div>
        <span class="bg-slate-300 mb-[10px] inline-block h-1 w-16 rounded-[100%]" />
        <div>
          <label for="prepare" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center  justify-center">{{ props.status === 'ready' ? props.quiz?.name : 'Loading...' }}</div>
          </label>

          <label v-if="props.status === 'ready'" for="prepare" class="text-muted-foreground block text-sm font-normal leading-6">Total Questions [{{ quiz?.size }}]</label>
          <label v-else for="prepare" class="text-muted-foreground block text-sm font-normal leading-6">Preparing quiz, please wait...</label>
        </div>

        <div v-if="props.status === 'ready'" class="m-5">
          <Button type="submit" variant="default" class="w-full">
            Start
            <Icon name="lucide:move-right" class="ms-2" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>