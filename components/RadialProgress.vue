<script setup lang="ts">
import RadialProgress from 'vue3-radial-progress'

type ColorVariant = 'grey' | 'green' | 'orange' | 'red'
interface Props {
  variant?: ColorVariant
  text?: string
  completedSteps?: number
  totalSteps?: number
}
interface ColorVariants {
  [key: string]: {
    start: string
    stop: string
    bg: string
    text: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'grey',
  completedSteps: 0,
  totalSteps: 10,
})

const completeStep = computed(() => props.completedSteps >= props.totalSteps ? props.totalSteps : props.completedSteps)

// startColor	string	'#00C58E'	Sets the start color of the inner stroke (gradient).
// stopColor	string	'#00E0A1'	Sets the end color of the inner stroke (gradient).
// innerStrokeColor	string	'#2F495E'	Sets the color of the inner stroke to be applied to the shape.

const colorVariants: ColorVariants = {
  grey: {
    stop: '#cbd5e0', // Tailwind grey-300
    start: '#a0aec0', // Tailwind grey-400
    bg: 'bg-grey-100', // Tailwind grey-100 for background
    text: 'text-grey-800', // Tailwind grey-800 for text
  },
  green: {
    stop: '#48bb78', // Tailwind green-500
    start: '#38a169', // Tailwind green-400
    bg: 'bg-green-100',
    text: 'text-green-800',
  },
  orange: {
    stop: '#ed8936', // Tailwind orange-500
    start: '#dd6b20', // Tailwind orange-400
    bg: 'bg-orange-100',
    text: 'text-orange-800',
  },
  red: {
    stop: '#f56565', // Tailwind red-500
    start: '#e53e3e', // Tailwind red-400
    bg: 'bg-red-100',
    text: 'text-red-800',
  },
}

const getVariantColors = (variant: ColorVariant) => colorVariants[variant]

const startColor = computed(() => getVariantColors(props.variant).start)
// const stopColor = computed(() => getVariantColors(props.variant).stop)
const stopColor = computed(() => getVariantColors(props.variant).start)
const circleBgClass = computed(() => getVariantColors(props.variant).bg)
const textColorClass = computed(() => getVariantColors(props.variant).text)
const percentage = computed(() => Math.round((completeStep.value / props.totalSteps) * 100))
</script>

<template>
  <RadialProgress
    :diameter="107"
    :completed-steps="completeStep"
    :total-steps="props.totalSteps"
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
