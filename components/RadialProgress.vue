<script setup lang="ts">
import { computed, defineProps, ref, withDefaults } from 'vue'
import RadialProgress from 'vue3-radial-progress'

  type ColorVariant = 'grey' | 'green' | 'orange' | 'red'

interface Props {
  variant: ColorVariant
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'grey',
})

const completedSteps = ref(0)
const totalSteps = ref(10)

interface ColorVariants {
  [key: string]: {
    start: string
    stop: string
    bg: string
    text: string
  }
}

const colorVariants: ColorVariants = {
  grey: {
    start: '#cbd5e0', // Tailwind grey-300
    stop: '#a0aec0', // Tailwind grey-400
    bg: 'bg-grey-100', // Tailwind grey-100 for background
    text: 'text-grey-800', // Tailwind grey-800 for text
  },
  green: {
    start: '#48bb78', // Tailwind green-500
    stop: '#38a169', // Tailwind green-400
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  orange: {
    start: '#ed8936', // Tailwind orange-500
    stop: '#dd6b20', // Tailwind orange-400
    bg: 'bg-orange-100',
    text: 'text-orange-800',
  },
  red: {
    start: '#f56565', // Tailwind red-500
    stop: '#e53e3e', // Tailwind red-400
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
  // ... other color variants
}

const getVariantColors = (variant: ColorVariant) => colorVariants[variant]

const startColor = computed(() => getVariantColors(props.variant).start)
const stopColor = computed(() => getVariantColors(props.variant).stop)
const circleBgClass = computed(() => getVariantColors(props.variant).bg)
const textColorClass = computed(() => getVariantColors(props.variant).text)
const percentage = computed(() => Math.round((completedSteps.value / totalSteps.value) * 100))
</script>

<template>
  <RadialProgress
    :diameter="107"
    :completed-steps="completedSteps"
    :total-steps="totalSteps"
    :stroke-width="8"
    inner-stroke-color="transparent"
    :start-color="startColor"
    :stop-color="stopColor"
  >
    <div :class="circleBgClass" class="rounded-full h-24 w-24 -z-10 flex items-center justify-center">
      <span class="font-semibold font-mono text-2xl tracking-wide" :class="textColorClass">
        {{ text ? text : `${percentage}%` }}
      </span>
    </div>
  </RadialProgress>
</template>
