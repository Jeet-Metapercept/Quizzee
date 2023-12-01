<script setup lang="ts">
import type { OptionType } from './Card.vue'
import { Toggle } from '@/components/ui/toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export interface Props {
  index: number
  option: OptionType
  icon: string
}
const props = defineProps<Props>()
const emit = defineEmits(['selected'])
const isPressed = ref<boolean>(false)

function selectOption() {
  isPressed.value = !isPressed.value
  const updatedOption = { ...props, is_selected: isPressed.value, index: props.index }
  emit('selected', updatedOption)
}
</script>

<template>
  <div>
    <label tabindex="0" class="border-border-highlight bg-accent-selected-bg z-10 text-heading focus-within:border-border-highlight focus-within:bg-accent-bg hover:bg-accent-bg relative flex cursor-pointer flex-col rounded-md border focus:outline-none">
      <Toggle size="lg" aria-label="Toggle italic" class="justify-start h-auto px-2 py-2" @update:pressed="selectOption()">
        <span class="flex items-center gap-2">
          <Avatar>
            <!-- <AvatarFallback class="text-lg text-muted-foreground font-semibold">{{ props.position }}</AvatarFallback> -->
            <AvatarFallback>
              <Icon :name="props.icon" class="text-heading  h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span class="select-none" :class="{ 'text-red-500': isPressed }">{{ option.option }} -- {{ isPressed }}</span>
          <!-- <span class="select-none" :class="{ 'text-muted-foreground': active }">299 792 458 m {{ active }}/ s</span> -->
        </span>
      </Toggle>
    </label>
  </div>
</template>
