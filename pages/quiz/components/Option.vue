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
    <label
      tabindex="0" class="border-border-highlight z-10 text-heading focus-within:border-border-highlight focus-within:bg-accent-bg flex cursor-pointer flex-col rounded-md border focus:outline-none hover:border-slate-600"
      :class="{ 'border-slate-600': isPressed }"
    >
      <Toggle size="lg" :aria-label="props.option.option" class="justify-start h-auto px-4 py-2" @update:pressed="selectOption()">
        <span class="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              <Icon :name="props.icon" class="text-heading h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span class="select-none text-start" :class="{ 'text-muted-foreground': !isPressed }">{{ option.option }} __ {{ isPressed }}</span>
        </span>
      </Toggle>
    </label>
  </div>
</template>
