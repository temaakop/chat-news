<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

const router = useRouter()

const userEmail = ref('')
const userToken = ref('')

const emailSent = ref(false)

const handleClick = () => {
  localStorage.setItem('token', userToken.value)
  userStore.setToken(userToken.value)
  router.push('/main')
}
</script>

<template>
  <div class="container">
    <div class="authorization-container">
      <h1 class="title">CHATNEWS</h1>

      <div class="input-container">
        <label> Введите токен:</label>
        <input v-model="userToken" class="token-input" type="text" placeholder="Введите токен" />
      </div>
      <div class="button-container">
        <button @click="handleClick" class="login-button">Login</button>
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
