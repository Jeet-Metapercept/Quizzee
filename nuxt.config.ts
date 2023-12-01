import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    // https://nuxt.com/docs/guide/going-further/runtime-config#exposing
    public: {
      PROJECT_NAME: process.env.PROJECT_NAME || pkg.name,
      PROJECT_VERSION: pkg.version,
      BASEURL: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  modules: ['@vueuse/nuxt', '@nuxtjs/tailwindcss', '@nuxtjs/supabase', '@nuxt/image', 'nuxt-icon', 'nuxt-lodash', '@nuxtjs/device', '@morev/vue-transitions/nuxt', ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }], '@pinia-plugin-persistedstate/nuxt'],
  supabase: {
    // https://supabase.nuxtjs.org/usage/composables/usesupabaseuser#auth-middleware
    // By default, the module is implementing a redirect middleware. All pages of your application are automatically redirected to the login page. However, you can allow redirection to "public" pages by setting the exclude redirect option.
    redirect: true, // bug https://github.com/nuxt-modules/supabase/issues/227
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/', '/auth/*'],
    },
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  hooks: {
    'components:dirs': (dirs) => {
      dirs.unshift({
        path: '~/components/ui',
        extensions: ['.vue'],
        prefix: 'Ui',
        pathPrefix: false,
      })
    },
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: 'utf-16',
      title: process.env.PROJECT_NAME,
      meta: [
        {
          name: 'description',
          content: 'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
        },
      ],
      viewport:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap',
        },
      ],
    },
  },
})
