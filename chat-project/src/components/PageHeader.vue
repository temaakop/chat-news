<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const emits = defineEmits<{
  (e: 'openModal'): void
}>()
</script>

<template>
  <div class="container">
    <header class="header">
      <div class="header__title">
        <h1>CHATNEWS</h1>
      </div>
      <div class="header__account">
        <p class="username">{{ userStore.userName }}</p>

        <div class="header__account-button">
          <img @click="emits('openModal')" class="account-avatar" :src="userStore.userAvatarUrl" />
        </div>
      </div>
    </header>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  background-color: #4395f3;
}

.header {
  max-width: 1000px;
  width: 100%;
  padding: 10px;
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__title h1 {
  color: white;
}

.header__account {
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  gap: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all linear 0.1s;
}

.header__account:hover {
  cursor: pointer;
  transform: scale(1.04);
}

.username {
  color: white;
  font-size: 18px;
}

.account-avatar {
  width: 48px;
  height: 48px;
  border-radius: 25rem;
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
