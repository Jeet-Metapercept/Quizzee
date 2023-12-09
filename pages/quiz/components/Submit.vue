<script setup lang="ts">
import type { QuizViewState } from '../helper'

const status = defineModel<QuizViewState>('status', { default: 'submit' })
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-brand flex items-center justify-center">
          <!-- <transition-fade> -->
          <Icon name="radix-icons:check-circled" class="w-24 h-24 text-green-600 rounded-full" />
          <!-- </transition-fade> -->
        </div>
        <span class="bg-slate-300 mb-[10px] inline-block h-1 w-16 rounded-[100%]" />
        <div>
          <label for="thankYouCard" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center  justify-center">That's a wrap!</div>
          </label><label for="thankYouCard" class="text-muted-foreground block text-sm font-normal leading-6">We appreciate your participation.</label>
        </div>
      </div>
    </div>
  </div>
</template>
