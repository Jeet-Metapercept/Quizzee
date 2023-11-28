<script setup lang="ts">
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

const isOpenImage = ref({
  enabled: false,
  url: '',
})

const tags = ['Tag-1', 'Tag-2', 'Tag-3', 'Tag-4', 'Tag-5']
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>New</CardTitle>
      <CardDescription>
        Add new question to question bank
      </CardDescription>
    </CardHeader>
    <CardContent class="grid gap-6">
      <Collapsible v-model:open="isOpenImage.enabled">
        <CollapsibleTrigger as-child>
          <Button variant="default" class="w-48">
            <Icon name="radix-icons:image" class="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="grid mt-4">
            <div class="flex w-full items-center gap-1.5">
              <p class="text-sm text-muted-foreground w-36">
                Image URL
              </p>
              <Input id="url" v-model="isOpenImage.url" placeholder="https://" />
              <!-- <Button class="w-48" size="sm">
                Preview
              </Button> -->
            </div>
            <div v-if="isOpenImage.enabled && isOpenImage.url" class="mt-4">
              <NuxtImg
                alt="Question Image"
                :src="isOpenImage.url"
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
        <Label for="description">Description/Hint</Label>
        <Textarea
          id="description"
          placeholder="Please include all information relevant to your question."
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="grid gap-2">
          <Label for="category">Category</Label>
          <Select default-value="billing">
            <SelectTrigger id="category">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="team">
                Team
              </SelectItem>
              <SelectItem value="billing">
                Billing
              </SelectItem>
              <SelectItem value="account">
                Account
              </SelectItem>
              <SelectItem value="deployments">
                Deployments
              </SelectItem>
              <SelectItem value="support">
                Support
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div class="grid gap-2">
          <Label for="security-level">Difficultly Level</Label>
          <Select default-value="2">
            <SelectTrigger
              id="security-level"
              class="line-clamp-1 w-full truncate"
            >
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

      <div class="grid grid-cols-4 gap-4">
        <div class="grid gap-2">
          <Label for="reference">Reference</Label>
          <Input id="reference" placeholder="eg. AIIMS 2021" />
        </div>
      </div>

      <div class="grid">
        <Label for="tags">Tags</Label>
        <div class="flex flex-wrap">
          <Toggle v-for="(t, i) in tags" :key="i" size="sm" :aria-label="`Toggle {t}`" class="m-2 w-24">
            {{ t }}
          </Toggle>
        </div>
      </div>
    </CardContent>
    <CardFooter class="flex justify-end space-x-2">
      <Button variant="outline">
        Cancel
      </Button>
      <Button>
        Submit
      </Button>
    </CardFooter>
  </Card>
</template>
