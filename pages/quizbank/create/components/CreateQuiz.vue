<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useQuestionStore } from '@/stores/questionbank'

const STORE = useQuestionStore()
const faker = useFaker()
const isComplete = ref(false)
const isLoading = ref(false)

// Categories
const categories = computed(() => STORE.GET_CATEGORIES)
const isSategoriesOpen = ref(false)
const selectedCategory = ref(categories.value[0])
function filterCategoryFunction(val: string[], search: string) {
  return val.filter(item => item.toLowerCase().includes(search.toLowerCase()))
}
const quiz = ref({
  title: faker.generateQuizName(),
  description: '',
})
</script>

<template>
  <div class="">
    <!-- <Button> new comp</Button> -->
    <Card v-if="!isComplete">
      <CardHeader>
        <CardTitle class="flex justify-between">
          Quiz <Button size="sm" variant="outline" :disabled="isLoading">
            <Icon
              name="radix-icons:question-mark-circled"
              class="mr-2 h-4 w-4"
            />
            Sample Quiz
          </Button>
        </CardTitle>
        <CardDescription>Create a new quiz</CardDescription>
      </CardHeader>

      <Separator class="mb-8" />

      <CardContent class="grid gap-6 mt-2">
        <div class="grid gap-2">
          <Label for="title" class="flex items-center justify-between">Title <Icon name="radix-icons:update" class="ms-1 w-3 h-3 cursor-pointer" @click="quiz.title = faker.generateQuizName()" /></Label>
          <Input id="title" v-model="quiz.title" placeholder="Quiz Title" :disabled="isLoading" />
        </div>
        <div class="flex gap-4 items-start">
          <div class="w-[110px] h-[110px] flex items-center justify-center rounded border cursor-pointer">
            <!-- <Icon name="material-symbols:add-photo-alternate-outline" class="w-12 h-12 text-slate-200" /> -->
            <img
              alt="quiz-logo"
              :src="`https://api.dicebear.com/7.x/shapes/svg?seed=${quiz.title}`"
              class="block rounded"
              :height="110"
              :width="110"
            >
          </div>

          <div class="flex flex-col flex-grow">
            <Label for="description" class="mb-2">Description</Label>
            <Textarea
              id="description"
              v-model="quiz.description"
              placeholder="Please include all information relevant to your quiz."
              :disabled="isLoading"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label for="category">Category</Label>
            <Popover v-model:open="isSategoriesOpen">
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  role="combobox"
                  :aria-expanded="isSategoriesOpen"
                  class=" justify-between"
                >
                  {{ selectedCategory ? selectedCategory : 'Select Category' }}
                  <Icon name="radix-icons:chevron-down" class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="p-0">
                <Command :filter-function="filterCategoryFunction">
                  <CommandInput placeholder="Search category..." />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="c in categories"
                        :key="c"
                        :value="c"
                        @select="(ev) => {
                          selectedCategory = ev.detail.value!
                          isSategoriesOpen = false
                        }"
                      >
                        <Icon
                          name="radix-icons:check" :class="cn(
                            'mr-2 h-4 w-4',
                            selectedCategory === c ? 'opacity-100' : 'opacity-0',
                          )"
                        />

                        {{ c }}
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
