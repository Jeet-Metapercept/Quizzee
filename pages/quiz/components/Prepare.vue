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
  quiz?: QuizRow
}
const props = defineProps<Props>()
const status = defineModel<QuizViewState>('status', { default: 'pre' })
const default_img = 'https://api.dicebear.com/7.x/initials/svg?seed=Quiz'
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-brand flex items-center justify-center">
          <Icon v-if="status !== 'ready'" name="svg-spinners:bouncing-ball" class="w-24 h-24 text-green-600 rounded-full" />
          <transition-fade v-else appear>
            <Avatar class="h-12 w-12 mb-4">
              <AvatarImage
                :src="quiz?.image_url || default_img" alt="quiz-image"
              />
              <AvatarFallback>QZ</AvatarFallback>
            </Avatar>
          </transition-fade>
        </div>
        <span class="bg-slate-300 mb-[10px] inline-block h-1 w-16 rounded-[100%]" />

        <transition-fade appear>
          <div v-if="status === 'ready'">
            <label for="prepare" class="text-heading mb-1.5 block text-base font-semibold leading-6">
              <div class="flex items-center  justify-center">{{ status === 'ready' ? props.quiz?.name : 'Loading...' }}</div>
            </label>

            <label v-if="status === 'ready'" for="prepare" class="text-muted-foreground block text-sm font-normal leading-6">Total Questions [{{ quiz?.size }}]</label>
            <label v-else for="prepare" class="text-muted-foreground block text-sm font-normal leading-6">Preparing quiz, please wait...</label>
          </div>
        </transition-fade>

        <div v-if="status === 'ready'" class="m-5">
          <Button type="submit" variant="default" class="w-full">
            Start
            <Icon name="lucide:move-right" class="ms-2" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
