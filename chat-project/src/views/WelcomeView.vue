<script setup lang="ts">
import { connectionToWebSocket } from '@/api/api';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'

onMounted(() => {
  const userEmail = localStorage.getItem('email');
  const userToken = localStorage.getItem('token');
  if (userEmail && userToken) {
    connectionToWebSocket(userToken);
    router.push('/main')
  }
})

const router = useRouter()
</script>

<template>
  <div class="d-flex h-screen align-center justify-center bg-indigo-lighten-3">
    <v-card
      class="py-6 d-flex align-center flex-column justify-center rounded bg-indigo"
      :width="350"
    >
      <v-card-title class="text-h3 mb-6">CHATNEWS</v-card-title>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn
          prepend-icon="mdi-account-circle"
          rounted="xs"
          elevation="4"
          @click="router.push('/authorization')"
          class="bg-indigo-lighten-5"
        >
          Регистрация
        </v-btn>
        <v-btn
        prepend-icon="di-login"
          rounted="xs"
          elevation="4"
          @click="router.push('/login')"
          class="bg-indigo-lighten-5"
        >
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
