<script setup lang="ts">
import { sample_invoices } from '../../config'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Props {
  selectable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selectable: false,
})

const invoices = ref(sample_invoices)
</script>

<template>
  <div>
    <h2 class="text-heading font-bold tracking-tight">
      Find Question
    </h2>
    <div class="mt-4">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead v-if="props.selectable" class="w-[50px]" />
            <TableHead class="w-[100px]">
              Invoice
            </TableHead>
            <TableHead class="text-right">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="invoice in invoices" :key="invoice.invoice">
            <TableCell v-if="props.selectable" class="font-medium">
              <Checkbox />
            </TableCell>
            <TableCell class="font-medium">
              {{ invoice.invoice }}
            </TableCell>
            <TableCell class="text-right">
              {{ invoice.totalAmount }}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
