<script setup lang="ts">
import { getUserInfo } from '@/api/api'
import UserInfoModal from '@/components/common/UserInfoModal.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'

const modalIsOpen = ref(false)

const userStore = useUserStore()

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (token) {
    const userInfo = await getUserInfo(token)
    userStore.setToken(token)
    userStore.setEmail(userInfo.email)
    console.log(userInfo)
    userStore.setUserName(userInfo.name)
  }
})

const openModal = () => {
  return (modalIsOpen.value = true)
}
const closeModal = () => {
  return (modalIsOpen.value = false)
}
</script>

<template>
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
      <RouterView />
    </div>
  </main>
</template>
<style scoped>
main {
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 7fr;
  gap: 10px;
  padding: 20px;
}

.content {
  background-color: #4395f3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  padding: 10px;
}

.sidebar {
  max-width: 350px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.sidebar ul {
  list-style: none;
  color: white;
  font-size: 22px;
}

a {
  padding: 5px;
  display: block;
  width: 100px;
  color: rgb(65, 62, 62);
  cursor: pointer;
  transition: all linear 0.2s;
  border-radius: 5px;
}

a:hover {
  color: rgb(32, 32, 32);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}
</style>
