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
  <div class="prepare-form">
    <div class="hidden md:block">
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

          <div v-if="status === 'pre'">
            <label class="mb-1.5 text-muted-foreground block text-sm font-normal leading-6">
              <Icon name="svg-spinners:180-ring" class="me-2 h-3 w-3" />preparing, please wait.</label>
          </div>

          <transition-fade appear>
            <div v-if="status === 'ready'">
              <span class="text-heading mb-1.5 block text-base font-semibold leading-6">
                <div class="flex items-center  justify-center">{{ props.quiz?.name || 'Take a Quiz' }}</div>
              </span>

              <span class="text-muted-foreground block text-sm font-normal leading-6">Total Questions [{{ quiz?.size || '?' }}]</span>

              <div class="m-4">
                <Button type="submit" variant="default" class="w-full" @click="status = 'in-process'">
                  Start
                  <Icon name="lucide:move-right" class="ms-2" />
                </Button>
              </div>
            </div>
          </transition-fade>
        </div>
      </div>
    </div>

    <div class="w-full h-screen block md:hidden">
      <div class="flex flex-col justify-between px-8 h-full">
        <div class="w-full m-auto">
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

              <div v-if="status === 'pre'">
                <label class="mb-1.5 text-muted-foreground block text-sm font-normal leading-6">
                  <Icon name="svg-spinners:180-ring" class="me-2 h-3 w-3" />preparing, please wait.</label>
              </div>

              <transition-fade appear>
                <div v-if="status === 'ready'">
                  <span class="text-heading mb-1.5 block text-base font-semibold leading-6">
                    <div class="flex items-center  justify-center">{{ props.quiz?.name || 'Take a Quiz' }}</div>
                  </span>

                  <span class="text-muted-foreground block text-sm font-normal leading-6">Total Questions [{{ quiz?.size || '?' }}]</span>

                  <div class="m-4">
                    <Button type="submit" variant="default" class="w-full" @click="status = 'in-process'">
                      Start
                      <Icon name="lucide:move-right" class="ms-2" />
                    </Button>
                  </div>
                </div>
              </transition-fade>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
