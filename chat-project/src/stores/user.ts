import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('counter', () => {
  const userName = ref('')
  const email = ref('')
  const token = ref('')

  function setUserName(payload: string) {
    userName.value = payload
  }
  function setEmail(payload: string) {
    email.value = payload
  }
  function setToken(payload: string) {
    token.value = payload
  }

  return { userName, email, token, setEmail, setToken, setUserName }
})
