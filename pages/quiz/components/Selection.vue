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

const tabs = ref(Array.from({ length: 20 }, (_, index) => `${index + 1}`))
const currentTab = ref(tabs.value[0])
</script>

<template>
  <div class="grid">
    <!-- <Sheet v-for="side in SHEET_SIDES" :key="side"> -->
    <Sheet>
      <SheetTrigger as-child>
        <button class="inline-flex items-center border appearance-none  rounded-md relative hover:text-slate-600 focus:outline-none dark:text-slate-700 dark:hover:text-slate-500 py-0.2 mr-2 bg-white px-2 font-sans text-sm text-slate-500">
          Switch
          <Icon name="tabler:status-change" class="ml-2 cursor-pointer text-muted-foreground" />
        </button>
        <!-- <Button variant="outline" class="w-full">Switch Question</Button> -->
      </SheetTrigger>
      <SheetContent side="bottom" class="lg:border lg:w-[800px] lg:mx-auto">
        <SheetHeader class="text-start">
          <SheetTitle>
            Switch to
          </SheetTitle>
          <SheetDescription>
            Jump to a question
          </SheetDescription>
        </SheetHeader>
        <div class="grid py-4">
          <div class="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-8 gap-2 bg-muted rounded p-2">
            <SheetClose v-for="(tab, i) in tabs" :key="i" as-child>
              <Button size="sm" :variant="currentTab === tab ? 'default' : 'outline'" type="submit" @click="currentTab = tab">
                <Icon :name="i % 3 ? 'tabler:circle' : 'tabler:circle-filled'" class="me-2" />{{ tab }}
              </Button>
            </SheetClose>
          </div>
        </div>
        <SheetFooter>
          <SheetClose as-child>
            <Button type="submit" variant="outline" class="lg:w-36">
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>