<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-brand flex items-center justify-center">
          <Icon name="svg-spinners:bouncing-ball" class="w-24 h-24 text-green-600 rounded-full" />
        </div>
        <span class="bg-slate-300 mb-[10px] inline-block h-1 w-16 rounded-[100%]" />
        <div>
          <label for="prepare" class="text-heading mb-1.5 block text-base font-semibold leading-6">
            <div class="flex items-center  justify-center">Quiz Title</div>
          </label><label for="prepare" class="text-subheading block text-sm font-normal leading-6">Preparing quiz, please wait...</label>
        </div>

        <div class="m-5">
          <Button type="submit" variant="default" class="w-full">
            Start
            <Icon name="lucide:move-right" class="ms-2" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
