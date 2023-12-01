<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Props {
  open?: boolean
  loading?: boolean
  position?: string
}
const props = defineProps<Props>()
</script>

<template>
  <div>
    <label tabindex="0" class="border-border-highlight bg-accent-selected-bg z-10 text-heading focus-within:border-border-highlight focus-within:bg-accent-bg hover:bg-accent-bg relative flex cursor-pointer flex-col rounded-md border focus:outline-none">
      <Toggle size="lg" aria-label="Toggle italic" class="justify-start h-14 px-2">
        <span class="flex items-center gap-2">
          <Avatar>
            <!-- <AvatarFallback class="text-lg text-muted-foreground font-semibold">{{ props.position }}</AvatarFallback> -->
            <AvatarFallback>
              <Icon :name="`tabler:letter-${props.position}`" class="text-muted-foreground h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span>299 792 458 m / s</span>
        </span>
      </Toggle>
    </label>
  </div>
</template>
