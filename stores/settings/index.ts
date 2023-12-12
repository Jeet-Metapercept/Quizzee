import { defineStore } from 'pinia'
import type { State } from './types'

export const useSettingStore = defineStore('settingStore', {
  state: (): State => ({
    preLoginUrl: null,
  }),
  getters: {

  },
  actions: {
    SET_PRE_LOGIN_URL(url: string | null) {
      this.preLoginUrl = url
    },
    CLEAR_PRE_LOGIN_URL() {
      this.preLoginUrl = null
    },
  },
})
