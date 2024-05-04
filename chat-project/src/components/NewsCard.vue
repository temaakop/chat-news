<script setup lang="ts">
import type { NewsArticle } from '@/types/types'

const props = defineProps<{
  article: NewsArticle
}>()
</script>

<template>
  <div class="news-card">
    <img class="news-image" alt="News image" :src="article.urlToImage" />
    <p class="news-title">{{ article.title }}</p>
    <p class="author">
      Author : <b>{{ article.author }}</b>
    </p>
    <p class="news__description">{{ article.description }}</p>
    <a class="news__original-link" :href="article.url">Ссылка на оригинал</a>
  </div>
</template>

<style scoped>
.news-card {
  margin: 15px 0;
  background-color: white;
  border: white solid 2px;
  border-radius: 5px;
  padding: 10px;
  color: rgb(65, 62, 62);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
}

.news-title {
  font-size: 20px;
  color: rgb(34, 34, 34);
  font-weight: bold;
}

.author b {
  color: rgb(61, 60, 60);
}

.news__description {
  font-size: 18px;
}

.news__original-link {
  cursor: pointer;

  color: rgb(65, 62, 62);
}
.news-image {
  width: 100%;
  height: auto;
  display: block;
}
</style>
