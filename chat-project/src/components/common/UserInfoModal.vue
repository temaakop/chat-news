<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const emits = defineEmits<{
  (e: 'closeModal'): void
}>()

const userStore = useUserStore()
</script>

<template>
  <div class="container">
    <div class="container__user-info">
      <div class="user-info__header">
        <h3>Информация о пользователе:</h3>
        <button @click="emits('closeModal')">X</button>
      </div>

      <div>
        <p>E-mail :</p>
        <p>{{ userStore.email }}</p>
      </div>
      <div>
        <p>Name :</p>
        <p>{{ userStore.userName }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: rgba(11, 3, 20, 0.534);
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container__user-info {
  max-width: 440px;
  width: 100%;
  background-color: rgb(59, 13, 80);
}

.user-info__header {
  display: flex;
  justify-content: space-between;
}

.user-info__header button {
  cursor: pointer;
}
</style>
