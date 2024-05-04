<script setup lang="ts">
import type { Message } from '@/types/types'
import { useWebSocket } from '@/composables/useWebSocket'

import ChatMessage from '@/components/ChatMessage.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { connectionToWebSocket, getChatMessages } from '@/api/api'
import { useUserStore } from '@/stores/user'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'
const userStore = useUserStore()
const messagesContainer = ref()
const endOfMessagesViews = ref(20)
const messages = ref<Message[]>([])
const { message, sendMessage } = useWebSocket(userStore.token)
const messageText = ref<string>('')

onMounted(async () => {
  connectionToWebSocket(userStore.token)
  messages.value = await getChatMessages(userStore.token)

  setTimeout(() => {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
})

const handleScroll = () => {
  if (messagesContainer.value.scrollTop === 0) {
    messagesContainer.value.scrollTop = 1918
    endOfMessagesViews.value += 20
  }
}

watch(message, (newMessage: Message | undefined) => {
  if (newMessage) messages.value = [newMessage, ...messages.value]
})

const viewsMessages = computed(() => {
  return messages.value.slice(0, endOfMessagesViews.value).reverse()
})

function handleClick() {
  console.log('message', messageText.value)
  sendMessage(messageText.value)
  messageText.value = ''
}
</script>

<template>
  <div @scroll="handleScroll" class="chat-container" ref="messagesContainer">
    <ChatMessage v-for="(message, index) in viewsMessages" :key="index" :message="message" />
  </div>

  <form @submit.prevent="handleClick" class="message-input">
    <!-- <input v-model="messageText" type="text" /> -->
    <InputComponent v-model="messageText" type="text"> </InputComponent>
    <!-- <InputComponent v-model="messageText" type="text"></InputComponent>
    <InputComponent v-model="messageText" type="text" size="small"></InputComponent> -->
    <ButtonComponent>Отправить </ButtonComponent>
  </form>
</template>

<style scoped>
.chat-container {
  max-height: 68vh;
  overflow-y: scroll;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message-input {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
}

/* .message-input input {
  width: 100%;
}

.message-input button {
  cursor: pointer;
  margin-left: 15px;
} */
</style>
