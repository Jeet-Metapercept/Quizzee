<script setup lang="ts">
import { sample_invoices } from './config'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EmptyPlaceholder from '@/components/EmptyPlaceholder.vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Banner from '@/components/core/page/banner.vue'

definePageMeta({
  layout: 'app-layout',
})
const router = useRouter()
const page = {
  title: 'Quiz Bank',
  sub: 'A collection of quizzes.',
}

const invoices = ref(sample_invoices)
</script>

<template>
  <div class="h-full flex-1 flex-col space-y-8 lg:p-8 md:flex">
    <div class="flex items-center justify-between space-y-2">
      <Banner :title="page.title" :subtitle="page.sub" />
      <div class="flex items-center space-x-2">
        <Button class="lg:w-36" @click="router.push('/quizbank/create')">
          <Icon name="radix-icons:plus-circled" class="mr-2 h-4 w-4" />Create
        </Button>
      </div>
    </div>

    <div>
      <Tabs default-value="mine">
        <TabsList class="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="mine">
            My Quizzes
          </TabsTrigger>
          <TabsTrigger value="all">
            All
          </TabsTrigger>
        </TabsList>
        <TabsContent value="mine">
          <EmptyPlaceholder icon="radix-icons:info-circled" title="No Quizzes Found" text="You do not have any quizzes at the moment." />
        </TabsContent>
        <TabsContent value="all">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="w-[100px]">
                  Invoice
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead class="text-right">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="invoice in invoices" :key="invoice.invoice">
                <TableCell class="font-medium">
                  {{ invoice.invoice }}
                </TableCell>
                <TableCell>{{ invoice.paymentStatus }}</TableCell>
                <TableCell>{{ invoice.paymentMethod }}</TableCell>
                <TableCell class="text-right">
                  {{ invoice.totalAmount }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
