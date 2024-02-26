<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emits = defineEmits<{
  (e: 'openModal'): void
}>()
</script>

<template>
  <header class="header">
    <div class="header__title">
      <h1>CHATNEWS</h1>
    </div>
    <div class="header__account">
      <p class="username">{{ userStore.userName }}</p>
      <div class="header__account-button">
        <button @click="emits('openModal')" class="account__button"></button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  padding: 10px;
  height: 64px;
  background-color: rgba(116, 27, 199, 0.911);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__title h1 {
  color: white;
}

.header__account {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.username {
  color: white;
  font-size: 18px;
}
.header__account-button {
  width: 48px;
  height: 48px;
  background-image: url('../assets/account-logo.png');
}

.account__button {
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

main {
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 10px;
  padding: 20px;
}

.content {
  background-color: rgba(108, 23, 141, 0.671);
  border: 1px solid white;
  border-radius: 2px;
  align-items: stretch;
}
</style>
