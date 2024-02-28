<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tokenRequest } from '@/api/api'
const userStore = useUserStore()

const router = useRouter()

const userEmail = ref('')
const userToken = ref('')

const emailSent = ref(false)

const handleClick = () => {
  // localStorage.setItem('email', userEmail.value)
  userStore.setEmail(userEmail.value)
  tokenRequest(userStore.email)
  router.push('/login')
}

// const tokenRequest = async () => {
//   const request = await fetch('https://edu.strada.one/api/user', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify({
//       email: userEmail.value
//     })
//   })
//   return request
// }
</script>

<template>
  <div class="container">
    <div class="authorization-container">
      <h1 class="title">CHATNEWS</h1>
      <div class="input-container">
        <label> Введите email: {{ userEmail }}</label>
        <input v-model="userEmail" class="email-input" type="email" placeholder="Введите e-mail" />
      </div>

      <div class="button-container">
        <button @click="handleClick" class="login-button">Отправить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(63, 15, 107, 0.568);
}

.authorization-container {
  padding: 15px;
  gap: 10px;
  background-color: rgba(116, 27, 199, 0.911);
  border-radius: 5px;
  border: 1px solid white;
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.input-container label {
  align-self: flex-start;
}

input {
  height: 35px;
  max-width: 250px;
  width: 100%;
}

.login-button {
  cursor: pointer;
  height: 25px;
  width: 75px;
  background-color: rgb(247, 244, 248);
  border: none;
  border-radius: 2px;
}
</style>
