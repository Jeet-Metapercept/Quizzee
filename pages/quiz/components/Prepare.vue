<script setup lang="ts">
import { Button } from '@/components/ui/button'
import type { QuizRow } from '~/utils/types/quiz.types'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { useQuizStore } from '~/stores/quiz'
import type { QuizQuestion } from '~/stores/quiz/types'

const QUIZ_STORE = useQuizStore()
const route = useRoute()
const router = useRouter()
const user = useSupabaseUser()
const quiz = computed(() => QUIZ_STORE.GET_QUIZ)
const { auth } = useSupabaseClient()

function redirectUnauthenticatedUsers() {
  if (user.value)
    return true

  if (!user.value) {
    router.push({
      path: '/auth/login',
      query: {
        redirect: route.fullPath,
      },
    })
  }
}

const status = computed(() => QUIZ_STORE.GET_QUIZ_STATUS)
const default_img = 'https://api.dicebear.com/7.x/initials/svg?seed=Quiz'

async function prepareQuestions(ids: string[]) {
  const questions = await QUIZ_STORE.FETCH_QUIZZE_QUESTIONS({ ids }).catch(() => QUIZ_STORE.SET_QUIZ_STATUS('error')) as unknown as QuizQuestion[]

  const questionsWithSubmittedAnswer = questions.map(item => ({
    ...item,
    submitted_answers: item.view_only_answers.map(answer => ({
      ...answer,
      is_selected: false,
    })),
  }))

  await QUIZ_STORE.SET_QUESTIONS(questionsWithSubmittedAnswer)
  QUIZ_STORE.SET_QUIZ_STATUS('ready')
}

async function startQuiz() {
  // prepare questions only if user authenticated
  if (redirectUnauthenticatedUsers() && quiz.value) {
    await prepareQuestions(quiz.value.questions!).catch(() => QUIZ_STORE.SET_QUIZ_STATUS('error'))

    await delay(5000)
    QUIZ_STORE.SET_QUIZ_STATUS('in-process')
    QUIZ_STORE.SET_QUIZ_META({ start: new Date() })
  }
}

async function handleSignInWithGoogle(response: any) {
  const { data, error } = await auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
    nonce: 'NONCE', // must be the same one as provided in data-nonce (if any)
  })
  console.log(data, error)
}
</script>

<template>
  <div class="complete-form">
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-brand flex items-center justify-center">
          <Icon v-if="status !== 'ready'" name="svg-spinners:bouncing-ball" class="w-24 h-24 text-green-600 rounded-full" />
          <transition-fade v-else appear>
            <Avatar class="h-12 w-12 mb-4">
              <AvatarImage
                :src="quiz?.image_url || default_img" alt="quiz-image"
              />
              <AvatarFallback>QZ</AvatarFallback>
            </Avatar>
          </transition-fade>
        </div>
        <span class="bg-slate-300 mb-[10px] inline-block h-1 w-16 rounded-[100%]" />

        <div v-if="status === 'pre'">
          <label class="mb-1.5 text-muted-foreground block text-sm font-normal leading-6">
            <Icon name="svg-spinners:180-ring" class="me-2 h-3 w-3" />preparing, please wait.</label>
        </div>

        <transition-fade appear>
          <div v-if="status === 'ready'">
            <span class="text-heading mb-1.5 block text-base font-semibold leading-6">
              <div class="flex items-center  justify-center">{{ quiz?.name || 'Take a Quiz' }}</div>
            </span>

            <span class="text-muted-foreground block text-sm font-normal leading-6">Total Questions [{{ quiz?.size || '?' }}]</span>

            <div class="m-4">
              <Button type="submit" variant="default" class="w-full" @click="startQuiz">
                Start
                <Icon name="lucide:move-right" class="ms-2" />
              </Button>
              <Button variant="outline" class="w-full mt-2">
                <Icon name="logos:google-icon" class="mr-2 h-4 w-4" />
                Continue with Google [manual]
              </Button>
            </div>

            <div class="mt-2 ring-2">
              <div
                id="g_id_onload"
                data-client_id="506469193052-fut093n2b0ulonovfgn0f50lrgp3u01o.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleSignInWithGoogle"
                data-itp_support="true"
                data-auto_select="false"
              />

              <div
                class="g_id_signin"
                data-type="standard"
                data-shape="rectangular"
                data-theme="outline"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              />
            </div>
          </div>
        </transition-fade>
      </div>
    </div>
  </div>
</template>
