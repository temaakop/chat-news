<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="container">
    <div class="authorization-container">
      <h1 class="title">CHATNEWS</h1>
      <div class="button-container">
        <button @click="router.push('/authorization')" class="authorization-button">
          Регистрация
        </button>
        <button @click="router.push('/login')" class="login-button">Войти</button>
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

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
}

button {
  cursor: pointer;
  height: 25px;

  background-color: rgb(247, 244, 248);
  border: none;
  border-radius: 2px;
}
</style>
