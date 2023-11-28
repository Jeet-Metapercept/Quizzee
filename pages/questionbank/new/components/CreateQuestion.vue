<script setup lang="ts">
import type { Answer } from '@/utils/types/types'
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

const { toast } = useToast()
const isOpenImage = ref({
  enabled: false,
  url: '',
})

const categories = ['Team', 'Billing', 'Account', 'Deployments', 'Support']

// Tags
const tags = ref([
  { text: 'Tag-1', active: false },
  { text: 'Tag-2', active: false },
  { text: 'Tag-3', active: false },
  { text: 'Tag-4', active: false },
  { text: 'Tag-5', active: false },
])

function toggleTag(tag: { active: boolean }) {
  tag.active = !tag.active
}

// Answers
const max_allowed_answers = 10
const answers = ref<Array<Answer>>([{
  text: 'Option A',
  image_url: null,
  is_correct: true,
},
{
  text: 'Option B',
  image_url: null,
  is_correct: false,
},
])

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
              <p class="text-sm text-muted-foreground w-36">
                Image URL
              </p>
              <Input id="url" v-model="isOpenImage.url" placeholder="https://" />
              <Button class="w-48" size="sm">
                Preview
              </Button>
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
        <Label for="subject">Question</Label>
        <Input id="subject" placeholder="Type your Question..." />
      </div>
      <div class="grid gap-2">
        <Label for="description">Description</Label>
        <Textarea
          id="description"
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
              <Input id="answers" :placeholder="`${a.text}`" />

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
          <Input id="reference" placeholder="eg. AIIMS 2021" />
        </div>
        <div class="grid gap-2">
          <Label for="category">Category</Label>
          <Select :default-value="categories[0]">
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
          <Select default-value="2">
            <SelectTrigger id="security-level" class="line-clamp-1 w-full truncate">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">
                Severity 1 (Highest)
              </SelectItem>
              <SelectItem value="2">
                Severity 2
              </SelectItem>
              <SelectItem value="3">
                Severity 3
              </SelectItem>
              <SelectItem value="4">
                Severity 4 (Lowest)
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
            @click="toggleTag(t)"
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
      <Button class="w-48">
        Submit
      </Button>
    </CardFooter>
  </Card>
</template>
