<script setup lang="ts">
import { getUserInfo } from '@/api/api'
import UserInfoModal from '@/components/common/UserInfoModal.vue'
import PageHeader from '@/components/PageHeader.vue'
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'

const modalIsOpen = ref(false)

const userStore = useUserStore()

onMounted(async () => {
  const userInfo = await getUserInfo(userStore.token)
  console.log(userInfo)
  userStore.setUserName(userInfo.name)
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
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 10px;
  padding: 20px;
}

main > div {
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
  cursor: pointer;
  transition: color linear 0.2s;
}

a:hover {
  color: rgb(61, 61, 61);
}
</style>
