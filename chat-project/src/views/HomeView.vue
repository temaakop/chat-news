<script setup lang="ts">
import { getUserInfo } from '@/api/api'
import { getNewsForSearch } from '@/api/api'
import UserInfoModal from '@/components/common/UserInfoModal.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import NewsView from '@/views/NewsView.vue'
import ChatView from '@/views/ChatView.vue'

const modalIsOpen = ref(false)

const userStore = useUserStore()

onMounted(async () => {
  const userInfo = await getUserInfo(userStore.token)
  userStore.setUserName(userInfo.name)
})
const openModal = () => {
  console.log('work')
  return (modalIsOpen.value = true)
}
const closeModal = () => {
  return (modalIsOpen.value = false)
}
</script>

<template>
  <!-- <RouterView /> -->
  <UserInfoModal @close-modal="closeModal" v-if="modalIsOpen" />
  <PageHeader @open-modal="openModal" />
  <main>
    <div class="sidebar">
      <ul>
        <li>
          <a @click="$router.push({ path: '/main/news', replace: true })">News</a>
        </li>
        <li>
          <a @click="$router.push({ path: '/main/chat', replace: true })">Message</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <!-- <NewsView /> -->

      <RouterView />
    </div>
  </main>
</template>
<style scoped>
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
  padding: 10px;
}
</style>
