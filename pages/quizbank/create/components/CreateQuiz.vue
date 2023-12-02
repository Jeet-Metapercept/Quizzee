<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EmptyPlaceholder from '@/components/EmptyPlaceholder.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const project = useRuntimeConfig().public.PROJECT_NAME
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

// Difficultly
const difficulty = Array.from({ length: 10 }, (_, index) => index + 1)
const selectedDifficultly = ref()

// Max Number of Question
const maxQ = [10, 20, 30, 40, 50]
const selectedMaxQ = ref()

// Time limits
const timeLimits = [10, 30, 45, 60, 90, 0]
const selectedTimelimit = ref()

// Randomize Questions
const selectedRandomize = ref(false)

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
              <PopoverContent class="p-0 lg:min-w-[350px]">
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

          <div class="grid gap-2">
            <Label for="timelimit">Time limit</Label>
            <Select v-model="selectedTimelimit" :disabled="isLoading">
              <SelectTrigger id="timelimit" class="line-clamp-1 w-full truncate">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="(d, i) in timeLimits" :key="i" :value="d.toString()">
                  <Icon name="radix-icons:timer" /> {{ d === 0 ? `no limit` : `${d} min` }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="grid gap-2">
            <Label for="difficulty-level">Difficultly</Label>
            <Select v-model="selectedDifficultly" :disabled="isLoading">
              <SelectTrigger id="difficulty-level" class="line-clamp-1 w-full truncate">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="(d, i) in difficulty" :key="i" :value="d.toString()">
                  {{ d }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="grid gap-2">
            <Label for="max-q-level">Number of Questions</Label>
            <Select v-model="selectedMaxQ" :disabled="isLoading">
              <SelectTrigger id="max-q-level" class="line-clamp-1 w-full truncate">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="(q, i) in maxQ" :key="i" :value="q.toString()">
                  {{ q }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div class="grid gap-2">
            <Label for="randomize">Randomize Questions</Label>
            <Switch
              id="randomize"
              :checked="selectedRandomize"
              @update:checked="selectedRandomize = !selectedRandomize"
            />
          </div>
        </div>

        <div class="grid gap-2">
          <Label for="quiz-questions">Questions</Label>
          <Tabs id="quiz-questions" default-value="pick">
            <TabsList class="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="pick">
                Pick Manually
              </TabsTrigger>
              <TabsTrigger value="ai" :disabled="true">
                {{ project }} AI
              </TabsTrigger>
            </TabsList>
            <TabsContent value="ai">
              <EmptyPlaceholder icon="radix-icons:info-circled" title="No Quizzes Found" text="You do not have any quizzes at the moment." />
            </TabsContent>
            <TabsContent value="pick">
              none
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      <CardFooter class="flex justify-end space-x-2">
        <Button variant="outline" class="lg:w-36" :disabled="isLoading">
          Reset
        </Button>

        <Button class="lg:w-36" :disabled="isLoading">
          Create
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>
