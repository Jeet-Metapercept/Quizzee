<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast'

definePageMeta({
  layout: 'application',
})

const { toast } = useToast()
const isLoading = ref(false)
const user = useSupabaseUser()
const { auth } = useSupabaseClient()

// async function logout() {
//   isLoading.value = true
//   const { error } = await auth.signOut()
//   if (error) {
//     isLoading.value = false

//     toast({
//       title: 'Uh oh! Something went wrong.',
//       variant: 'destructive',
//       duration: 4000,
//     })
//   }
//   else { navigateTo('/') }
// }
</script>

<template>
  <div class="relative w-full">
    <div class="">
      <p v-if="user" class="fVeafc in">
        Hi {{ user.email }}
      </p>
      <p v-else class="fVeafc">
        unauthenticated
      </p>
      <h1
        class="py-4 text-7xl font-semibold text-primary"
        style="line-height: 4.5rem; letter-spacing: -0.03em"
      >
        Nuxt3 + Supabase
      </h1>

      <p class="kRTmDC">
        Authentication with Google and email and password, using Supabase. Nuxt3
        app
      </p>
    </div>

    <ul class="my-8 menu bg-base-200 rounded-box">
      <li>
        <!-- <NuxtLink to="/form"> -->
        <Icon name="tabler-api" size="1.5rem" />
        Forms
        <!-- </NuxtLink> -->
        <!-- <NuxtLink to="/form/import"> -->
        <Icon name="tabler-database-import" size="1.5rem" />
        Import
        <!-- </NuxtLink> -->
        <!-- <NuxtLink to="/form/quicktest"> -->
        <Icon name="tabler-award" size="1.5rem" />
        Quick Test
        <!-- </NuxtLink> -->
      </li>
    </ul>
  </div>
</template>
