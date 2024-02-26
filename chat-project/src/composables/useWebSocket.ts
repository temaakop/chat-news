import { ref } from 'vue'
import { connectionToWebSocket } from '@/api/api'
import type { Message } from '@/types/types'

export const useWebSocket = (token: string) => {
  const socket = connectionToWebSocket(token)
  const message = ref<Message | undefined>()
  const sendMessage = (text: string) => {
    const jsonText = JSON.stringify({ text: text })
    socket.send(jsonText)
  }

  socket.onmessage = (newMessage) => {
    message.value = JSON.parse(newMessage.data)
  }

  return {
    message,
    sendMessage
  }
}
