<script setup lang="ts">
import { getNewsForSearch } from '@/api/api'
import NewsCard from '@/components/NewsCard.vue'
import { ref, watch } from 'vue'

const searchText = ref('')
const newsList = ref({})

const searchNews = async () => {
  newsList.value = await getNewsForSearch(searchText.value)
}
</script>

<template>
  <div class="news-container">
    <div class="search-news__container">
      <p>Поиск</p>
      <input type="text" v-model="searchText" />
      <button @click="searchNews" type="submit">Поиск</button>
    </div>
    <div v-if="!searchText" class="placeholder">Write something in search input</div>
    <NewsCard v-else v-for="(news, index) in newsList" :article="news" :key="index" />
  </div>
</template>

<style scoped>
.news-container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.search-news__container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
</style>
