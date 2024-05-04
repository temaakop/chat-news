<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const props = defineProps({
  message: Object
})

const checkUsername = () => {
  if (userStore.userName === props.message?.user.name) {
    return true
  }
  return false
}
</script>

<template>
  <div class="message" :class="{ 'my-message': checkUsername() }">
    <p class="username">{{ message?.user.name }}</p>
    <p class="message-text">{{ message?.text }}</p>
    <p class="message-date">
      <!-- Работает только при форматировании в шаблоне, если вынести в скрипт, то новые сообщения будут грузиться со временем предидущих 20 сообщений -->
      {{ new Date(props.message?.createdAt).getHours() }} :
      {{ new Date(props.message?.createdAt).getMinutes() }}
    </p>
  </div>
</template>

<style scoped>
.message {
  padding: 5px;
  color: black;
  width: 100%;
  max-width: 450px; /* мало */
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.username {
  color: rgb(75, 76, 77);
}

.message-date {
  align-self: flex-end;
}

.my-message {
  align-self: flex-end;

  width: 100%;
}
</style>
