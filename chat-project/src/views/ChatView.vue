<script setup lang="ts">
import type { Message } from '@/types/types'
import { useWebSocket } from '@/composables/useWebSocket'

import ChatMessage from '@/components/ChatMessage.vue'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { connectionToWebSocket, getChatMessages } from '@/api/api'
import { useUserStore } from '@/stores/user'

const userRouter = useUserStore()

const messagesContainer = ref()
const endOfMessagesViews = ref(20)
const messages = ref<Message[]>([])
const { message, sendMessage } = useWebSocket(userRouter.token)
const messageText = ref<string>('')

const userStore = useUserStore()

onMounted(async () => {
  messages.value = await getChatMessages(userStore.token)
  connectionToWebSocket(userStore.token)
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

// watch(messages, () => {
//   //Будет пролистывать вниз при обновленнии messages, исправить []

// setTimeout(() => {
//   messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
// })
// })

watch(message, (newMessage: Message | undefined) => {
  if (newMessage) messages.value = [newMessage, ...messages.value]
})

const viewsMessages = computed(() => {
  return messages.value.slice(0, endOfMessagesViews.value).reverse()
})

function handleClick() {
  sendMessage(messageText.value)
  messageText.value = ''
}
</script>

<template>
  <div @scroll="handleScroll" class="chat-container" ref="messagesContainer">
    <ChatMessage v-for="(message, index) in viewsMessages" :key="index" :message="message" />
  </div>
  <div class="message-input">
    <input v-model="messageText" type="text" />
    <button @click="handleClick">Отправить</button>
  </div>
</template>

<style scoped>
.chat-container {
  max-height: 75vh;
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
}

.message-input input {
  width: 100%;
}

.message-input button {
  cursor: pointer;
  margin-left: 15px;
}
</style>
