<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

// const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const

const tabs = ref(Array.from({ length: 20 }, (_, index) => `Q ${index + 1}`))
const currentTab = ref(tabs.value[0])

const isOpen = ref(false)

setTimeout(() => {
  isOpen.value = true
}, 4000)
</script>

<template>
  <div class="grid grid-cols-2 gap-2">
    <!-- <Sheet v-for="side in SHEET_SIDES" :key="side"> -->
    <Sheet>
      <SheetTrigger as-child>
        <Button variant="outline">
          bottom
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" class="lg:border lg:w-[800px] lg:mx-auto">
        <SheetHeader class="text-start">
          <SheetTitle>Jump to</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. -- {{ currentTab }}
          </SheetDescription>
        </SheetHeader>
        <div class="grid py-4">
          <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-2 bg-muted rounded p-2">
            <Button v-for="(tab, i) in tabs" :key="i" size="sm" :variant="currentTab === tab ? 'default' : 'outline'" type="submit" @click="currentTab = tab">
              {{ tab }}
            </Button>
          </div>
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit" variant="outline">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>
