<script setup lang="ts">
import { type Answer, type QuestionRow, questionRowSchema } from '@/utils/types/types'
import { Button } from '@/components/ui/button'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/toast/use-toast'

import useQuestionBank from '@/composables/useQuestionBank' // Adjust the import path as needed

const { toast } = useToast()
const isOpenImage = ref({
  enabled: false,
  url: '',
})

// Categories
const categories = ['General', 'Team', 'Billing', 'Account', 'Deployments', 'Support']
const selectedCategory = ref()

// Difficultly
const difficulty = Array.from({ length: 10 }, (_, index) => index + 1)
const selectedDifficultly = ref()

// Tags
const tags = ref([
  { text: 'Tag-1', active: false },
  { text: 'Tag-2', active: false },
  { text: 'Tag-3', active: false },
  { text: 'Tag-4', active: false },
  { text: 'Tag-5', active: false },
])

// function toggleTag(tag: { active: boolean }) {
//   tag.active = !tag.active
//   tags.value[index].active = !tags.value[index].active
// }

function toggleTag(index: number) {
  tags.value[index].active = !tags.value[index].active
}

// Answers
const max_allowed_answers = 10
const answers = ref<Array<Answer>>(Array.from({ length: 4 }, () => ({ text: '', image_url: null, is_correct: false })))

function toggleIsCorrect(index: number) {
  answers.value[index].is_correct = !answers.value[index].is_correct
}

function addOption() {
  if (answers.value.length < max_allowed_answers) {
    answers.value.push({
      text: `Option ${String.fromCharCode(65 + answers.value.length)}`,
      image_url: null,
      is_correct: false,
    })
  }
  else {
    toast({
      description: `Maximum limit of ${max_allowed_answers} options reached.`,
      variant: 'destructive',
      duration: 4000,
    })
  }
}

function removeOption(index: number) {
  if (answers.value.length > 2) {
    answers.value.splice(index, 1)
    for (let i = 0; i < answers.value.length; i++)
      answers.value[i].text = `Option ${String.fromCharCode(65 + i)}`
  }
  else {
    toast({
      description: 'Minimum of 2 options required.',
      variant: 'destructive',
      duration: 4000,
    })
  }
}

const initialQuestion = ref({
  question: {
    text: '',
    description: '',
    image_url: isOpenImage.value.enabled ? isOpenImage.value.url : null,
    reference: '',
  },
  answers: answers.value,
  author: '',
  category: selectedCategory.value,
  difficulty: 1,
  tags: [],
  views: 0,
  published: false,
})

const questionInput = ref<QuestionRow>(initialQuestion.value)
function submitQuestion() {
  questionInput.value.category = selectedCategory.value
  questionInput.value.difficulty = Number(selectedDifficultly.value) || 1
  questionInput.value.tags = tags.value
    .filter(tag => tag.active === true)
    .map(tag => tag.text)

  // validations

  const validationResult = questionRowSchema.safeParse(questionInput.value)

  if (validationResult.success) {
    console.log('Valid initialQuestion:', questionInput.value)
  }
  else {
    console.error('Validation errors:', validationResult.error.errors)
    const errorMessages = useMap(validationResult.error.errors, e => useGet(e, 'message', ''))
    const allErrors = useUniq(errorMessages)
    toast({
      title: 'Validation Failed',
      description: allErrors.join('\n'),
      variant: 'destructive',
      duration: 8000,
    })
  }

  // console.log(validationResult.error.errors)
}

// const QUESTION_BANK = useQuestionBank()

// async function fetchQuestions() {
//   const questions = await QUESTION_BANK.getQuestions()
//   console.log(questions)
// }
// fetchQuestions()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>New</CardTitle>
      <CardDescription>Add new question to question bank</CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <Collapsible v-model:open="isOpenImage.enabled">
        <CollapsibleTrigger as-child>
          <Button variant="outline" class="w-48">
            <Icon name="radix-icons:image" class="mr-2 h-4 w-4" />Add Image
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="grid mt-4">
            <div class="flex w-full items-center gap-1.5 my-1">
              <p class="text-sm text-muted-foreground w-24">
                Image URL
              </p>
              <Input id="url" v-model="isOpenImage.url" placeholder="https://" class="mr-1" />
              <!-- <Button class="w-48" size="sm">
                Preview
              </Button> -->
            </div>
            <div v-if="isOpenImage.enabled && isOpenImage.url" class="mt-4">
              <NuxtImg
                alt="Question Image"
                :src="isOpenImage.url"
                width="400"
                class="block p-4 border border-dashed"
                :placeholder="'https://placehold.co/300x200?text=Invalid+Image'"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input id="question" v-model="questionInput.question.text" placeholder="Type your Question..." />
      </div>
      <div class="grid gap-2">
        <Label for="description">Description</Label>
        <Textarea
          id="description"
          v-model="questionInput.question.description"
          placeholder="Please include all information relevant to your question."
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="answers">Options</Label>
          <div class="flex flex-col flex-wrap gap-2">
            <div v-for="(a, i) in answers" :key="i" class="flex items-center gap-2">
              <Avatar>
                <Icon :name="`tabler:letter-${String.fromCharCode(97 + i)}`" class="h-4 w-4" />
              </Avatar>
              <Input v-model="a.text" :placeholder="`Option ${String.fromCharCode(65 + i)}`" />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button
                      size="icon"
                      variant="outline"
                      class="w-12"
                      :class="{ 'text-white bg-green-500 hover:text-white hover:bg-green-600': a.is_correct }"
                      @click="toggleIsCorrect(i)"
                    >
                      <Icon name="radix-icons:check" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark as Correct Answer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button size="icon" variant="outline" class="w-12" @click="removeOption">
                      <Icon name="radix-icons:minus" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button variant="outline" size="sm" class="border-dashed" @click="addOption">
              <Icon name="radix-icons:plus-circled" class="mr-2 h-4 w-4" />Add Option
            </Button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div class="grid gap-2">
          <Label for="reference">Reference</Label>
          <Input id="reference" v-model="questionInput.question.reference" placeholder="eg. AIIMS 2021" />
        </div>
        <div class="grid gap-2">
          <Label for="category">Category</Label>
          <Select v-model="selectedCategory">
            <SelectTrigger id="category">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="c in categories" :key="c" :value="c">
                {{ c }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="security-level">Difficultly Level</Label>
          <Select v-model="selectedDifficultly">
            <SelectTrigger id="security-level" class="line-clamp-1 w-full truncate">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="d in difficulty" :key="d" :value="d.toString()">
                {{ d }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div class="grid">
        <Label for="tags">Tags</Label>
        <div class="flex flex-wrap mt-2">
          <Toggle
            v-for="(t, i) in tags"
            :key="i"
            size="sm"
            :aria-label="`Toggle {t}`"
            class="me-2 w-24"
            :class="{
              'border border-solid': t.active,
              'border border-dashed': !t.active,
            }"
            @click="toggleTag(i)"
          >
            {{ t.text }}
          </Toggle>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end space-x-2">
      <Button variant="outline" class="w-48">
        Cancel
      </Button>
      <Button class="w-48" @click="submitQuestion">
        Submit
      </Button>
    </CardFooter>
  </Card>
</template>
