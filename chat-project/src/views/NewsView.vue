<script setup lang="ts">
import { getNewsForSearch } from '@/api/api'
import NewsCard from '@/components/NewsCard.vue'
import { ref, watch } from 'vue'
import InputComponent from '@/components/InputComponent.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const searchText = ref('')
const newsList = ref({})

const searchNews = async () => {
  newsList.value = await getNewsForSearch(searchText.value)
}
</script>

<template>
  <div class="news-container">
    <h3 class="news__title">NEWS</h3>
    <div class="search-news__container">
      <input-component v-model="searchText"> Поиск</input-component>
      <!-- <input type="text" v-model="searchText" /> -->
      <!-- <button @click="searchNews" type="submit">Поиск</button> -->
      <button-component @click="searchNews" rounded> <p>></p></button-component>
    </div>
    <div v-if="!searchText" class="placeholder"></div>
    <NewsCard v-else v-for="(news, index) in newsList" :article="news" :key="index" />
  </div>
</template>

<style scoped>
.news-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.news__title {
  align-self: flex-start;
  font-size: 30px;
  color: white;
}

.search-news__container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
