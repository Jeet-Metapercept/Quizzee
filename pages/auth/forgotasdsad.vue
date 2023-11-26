<script setup lang="ts">
useHead({
  title: 'Forgot Password | PSM Trivia',
})
const email = ref('')
const { auth } = useSupabaseClient()
const loading = ref(false)
const authSuccess = ref('')
const authError = ref('')

async function resetPassword() {
  loading.value = true
  const { error } = await auth.resetPasswordForEmail(email.value, {
    redirectTo: `${window.location.origin}/auth/new-password`,
  })
  if (error) {
    loading.value = false
    authError.value = 'Invalid email credential'
    setTimeout(() => {
      authError.value = ''
    }, 5000)
  }
  else {
    loading.value = false
    authSuccess.value = 'We\'ve sent your an email.'
    setTimeout(() => {
      authSuccess.value = ''
    }, 5000)
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="DaoRb sm:max-w-xl w-full">
      <h1 class="eSHwvX">
        Forgot password -- {{ authError }}
      </h1>
      <form @submit.prevent="resetPassword">
        <div class="jGQTZC">
          <label class="iJLvzO">
            <div class="fdCSlG">
              <input
                v-model="email"
                class="cmCuLh"
                type="text"
                placeholder="Email address"
              >
            </div>
          </label>
        </div>
        <button class="gZMQdu" type="submit" :disabled="loading">
          <div class="bjhGPG" :class="{ loading }">
            Request
          </div>
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="jjoFVh"
            :class="{ loading }"
          >
            <g
              fill="none"
              stroke-width="1.5"
              stroke-linecap="round"
              class="faEWLr"
              style="stroke: var(--icon-color)"
            >
              <circle stroke-opacity=".2" cx="8" cy="8" r="6" />
              <circle cx="8" cy="8" r="6" class="VFMrX" />
            </g>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>
