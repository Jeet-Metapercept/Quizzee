<script setup lang="ts">
interface Props {
  progress: number
  text: string
  progressRingClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  progressRingClass: 'text-indigo-500',
})

const strokeDashoffset = computed(() => `calc(400 - (400 * ${props.progress}) / 100)`)
const centerText = computed(() => props.text)
</script>

<template>
  <div class="relative w-40 h-40">
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <!-- Background circle -->
      <circle
        class="text-gray-200 stroke-current"
        stroke-width="10"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
      />
      <!-- Progress circle -->
      <circle
        :class="progressRingClass"
        stroke-width="10"
        stroke-linecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        :stroke-dashoffset="strokeDashoffset"
      />
      <!-- Center text -->
      <text x="50" y="50" font-family="Verdana" font-size="12" text-anchor="middle" alignment-baseline="middle">{{ centerText }}</text>
    </svg>
  </div>
</template>

  <style scoped>
  .progress-ring__circle {
    stroke-dasharray: 400, 400;
    transition: stroke-dashoffset 0.35s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
  </style>
