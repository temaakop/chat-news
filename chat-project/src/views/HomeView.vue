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
  background-color: rgba(108, 23, 141, 0.671);
  border: 1px solid white;
  border-radius: 2px;
  padding: 10px;
}

.sidebar {
  height: 10vh;
}
.sidebar ul {
  color: white;
  font-size: 22px;
}

a {
  cursor: pointer;
  transition: color linear 0.2s;
}

a:hover {
  color: rgb(121, 94, 170);
}
</style>
