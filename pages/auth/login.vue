<script setup lang="ts">
import type { ViewType } from '@supabase/auth-ui-shared'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Auth } from '@nuxtbase/auth-ui-vue'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

const project = useRuntimeConfig().public.PROJECT_NAME
const client = useSupabaseClient() as any
const route = useRoute()

type FormType = 'login' | 'create' | 'forgot'
const form = ref<FormType>('login')
const formparams = ref(route.query.v ? route.query.v : '')

if (formparams.value) {
  if (formparams.value === 'forgot-password')
    form.value = 'forgot'

  else if (formparams.value === 'register-user')
    form.value = 'create'
}

const user = useSupabaseUser()
watchEffect(async () => {
  if (user.value)
    await navigateTo('/app')
})
const authView = ref<ViewType>('sign_in')

const icons = [
  'logos:nuxt-icon',
  'arcticons:quizlet',
  'ic:outline-keyboard-command-key',
  'material-symbols:keyboard-tab-rounded',
  'ic:baseline-keyboard-voice',
  'ic:sharp-keyboard-option-key',
  'mdi:apple-keyboard-shift',
]
const currentIconIndex = ref(0)
const currentIcon = ref(icons[currentIconIndex.value])

function shuffleIcons() {
  const shuffleInterval = setInterval(() => {
    currentIconIndex.value = (currentIconIndex.value + 1) % icons.length
    currentIcon.value = icons[currentIconIndex.value]
  }, 100)

  setTimeout(() => {
    clearInterval(shuffleInterval)
    currentIcon.value = icons[0]
  }, 2000)
}

onMounted(() => {
  shuffleIcons()
})
</script>

<template>
  <div>
    <!-- <div class="md:hidden">
      <NuxtImg
        alt="Authentication"
        src="/img/dark-gradient.webp"
        class="block"
      />
    </div> -->

    <div
      class="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 min-h-screen"
    >
      <div
        class="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex"
      >
        <div class="absolute inset-0 bg-zinc-900" />
        <div class="absolute inset-0 flex justify-center items-center">
          <!-- <Icon name="ic:outline-keyboard-command-key" size="8em"></Icon> -->
          <Icon :name="currentIcon" size="8em" />
        </div>
        <div class="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="mr-2 h-6 w-6"
          >
            <path
              d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"
            />
          </svg>
          {{ project }}
        </div>
        <div class="relative z-20 mt-auto">
          <blockquote class="space-y-2">
            <p class="text-sm">
              &ldquo;Failure is an option here. If things are not failing, you
              are not innovating enough. If something is important enough, even
              if the odds are stacked against you, you should still do
              it.&rdquo;
            </p>
            <footer class="text-sm">
              - Elon Musk
            </footer>
          </blockquote>
        </div>
      </div>
      <div class="lg:p-8">
        <div
          class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
        >
          <div id="client-auth">
            <div class="flex flex-col space-y-2 text-start">
              <h1 class="text-2xl font-semibold tracking-tight">
                Welcome
              </h1>
              <p class="text-sm text-muted-foreground">
                Please sign-in to your account
              </p>

              <Auth
                v-model:view="authView"
                :supabase-client="client"
                :query-params="{
                  access_type: 'offline',
                  prompt: 'consent',
                }"
                :magic-link="false"
                :appearance="{
                  theme: ThemeSupa,
                  className: 'bg-primary text-primary-foreground hover:bg-primary/90',
                  variables: {
                    default: {
                      colors: {
                        brand: 'hsl(var(--primary))',
                        brandAccent: 'hsl(var(--primary) / 0.9)',
                      },
                    },
                  },
                }"
                :providers="['google']"
              />
            </div>
          </div>
          <!-- <div v-if="form === 'login'">
            <div class="flex flex-col space-y-2 text-start mb-6">
              <h1 class="text-2xl font-semibold tracking-tight">
                Welcome
              </h1>
              <p class="text-sm text-muted-foreground">
                Please sign-in to your account
              </p>
            </div>
            <UserLoginForm />
          </div>
          <div v-else-if="form === 'forgot'">
            <div class="flex flex-col space-y-2 text-start mb-6">
              <h1 class="text-2xl font-semibold tracking-tight">
                Reset Password
              </h1>
              <p class="text-sm text-muted-foreground">
                Enter your email below to reset your password
              </p>
            </div>
            <UserForgotPassword />
          </div>
          <div v-else>
            <div class="flex flex-col space-y-2 text-start mb-6">
              <h1 class="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p class="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserCreateForm />
          </div> -->

          <p class="px-8 text-center text-xs text-muted-foreground">
            By clicking continue, you agree to our
            <a
              href="/terms"
              class="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>
            and
            <a
              href="/privacy"
              class="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
