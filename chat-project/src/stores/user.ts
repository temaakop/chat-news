import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('counter', () => {
  const userName = ref('')
  const email = ref('')
  const token = ref<string>('')
  const userAvatarUrl = ref()

  function setUserName(payload: string) {
    userName.value = payload
  }
  function setEmail(payload: string) {
    email.value = payload
  }
  function setToken(payload: string) {
    token.value = payload
  }
  function setUserAvatarUrl(payload: string) {
    userAvatarUrl.value = payload
  }

  return {
    userName,
    email,
    token,
    userAvatarUrl,
    setEmail,
    setToken,
    setUserName,
    setUserAvatarUrl
  }
})
