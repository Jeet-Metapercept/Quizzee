import { h } from 'vue'
import { Icon } from '#components'

const ArrowDownIcon = h(Icon, { name: 'radix-icons:arrow-down' })
const ArrowRightIcon = h(Icon, { name: 'radix-icons:arrow-right' })
const ArrowUpIcon = h(Icon, { name: 'radix-icons:arrow-up' })
const CheckCircledIcon = h(Icon, { name: 'radix-icons:check-circled' })
const CircleIcon = h(Icon, { name: 'radix-icons:circle' })
const CrossCircledIcon = h(Icon, { name: 'radix-icons:cross-circled' })
const QuestionMarkCircledIcon = h(Icon, { name: 'radix-icons:question-mark-circled' })
const StopwatchIcon = h(Icon, { name: 'radix-icons:stopwatch' })

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: h(QuestionMarkCircledIcon),
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: h(CircleIcon),
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: h(StopwatchIcon),
  },
  {
    value: 'done',
    label: 'Done',
    icon: h(CheckCircledIcon),
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: h(CrossCircledIcon),
  },
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: h(ArrowDownIcon),
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: h(ArrowRightIcon),
  },
  {
    label: 'High',
    value: 'high',
    icon: h(ArrowUpIcon),
  },
]
