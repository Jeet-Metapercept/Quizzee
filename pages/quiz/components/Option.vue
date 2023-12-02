<script setup lang="ts">
import type { OptionType } from './Card.vue'

// import { Toggle } from '@/components/ui/toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export interface Props {
  index: number
  option: OptionType
  icon: string
}
const props = defineProps<Props>()
const emit = defineEmits(['selected'])

function selectOption() {
  const updatedOption = { ...props, is_selected: !props.option.is_selected, index: props.index }
  emit('selected', updatedOption)
}
</script>

<template>
  <div>
    <label
      tabindex="0" class="border-border-highlight z-10 text-heading flex cursor-pointer flex-col rounded-md border focus:outline-none"
      :class="option.is_selected ? 'border-slate-600' : ''"
    >
      <!-- <Toggle size="lg" :aria-label="props.option.option" class="justify-start h-auto px-4 py-2" @update:pressed="selectOption()">
        <span class="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              <Icon :name="props.icon" class="text-heading h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span class="select-none text-start" :class="{ 'text-muted-foreground': !isPressed }">{{ option.option }}</span>
        </span>
      </Toggle> -->

      <Button
        size="lg" class="justify-start h-auto px-4 py-2"
        :variant="option.is_selected ? 'secondary' : 'ghost'"
        @click="selectOption()"
      >
        <span class="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              <Icon :name="props.icon" class="text-heading h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span class="select-none text-start">{{ option.option }}</span>
        </span>
      </Button>
    </label>
  </div>
</template>
