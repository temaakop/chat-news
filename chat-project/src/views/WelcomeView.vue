<script setup lang="ts">
import { useRouter } from 'vue-router'

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
          rounted="xs"
          elevation="4"
          @click="router.push('/login')"
          class="bg-indigo-lighten-5"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-login"></v-icon>
          </template>
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
