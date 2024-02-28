<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { requestOnChangesName, getUserInfo } from '@/api/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const emits = defineEmits<{
  (e: 'closeModal'): void
}>()

const userStore = useUserStore()
const router = useRouter()

const newName = ref('')

const handleClick = async () => {
  requestOnChangesName(userStore.token, newName.value)
  const userInfo = await getUserInfo(userStore.token)
  userStore.setUserName(userInfo.name)
}
</script>

<template>
  <div class="container">
    <div class="container__user-info">
      <div class="user-info__header">
        <h3>Информация о пользователе:</h3>
        <button @click="emits('closeModal')">X</button>
      </div>

      <div class="user-info">
        <p>E-mail :</p>
        <p class="text">{{ userStore.email }}</p>
      </div>
      <div class="user-info">
        <p>Имя :</p>
        <p class="text">{{ userStore.userName }}</p>
      </div>
      <div class="changes-name">
        <input v-model="newName" type="text" placeholder="Ввести имя" />
        <button @click="handleClick" class="changes-name__button">Изменить имя</button>
      </div>
      <button @click="router.push('/')" class="exit">Выйти из профиля</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-size: 20px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: rgba(11, 3, 20, 0.534);

  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container__user-info {
  border: 1px solid white;
  border-radius: 5px;
  padding: 20px;
  gap: 15px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  max-width: 680px;
  width: 100%;
  background-color: rgb(59, 13, 80);
}

.user-info__header {
  color: aliceblue;

  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.user-info__header button {
  cursor: pointer;
}
.user-info .text {
  color: aliceblue;
}
.changes-name {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.changes-name input {
  width: 100%;
  margin-right: 15px;
}
.exit {
  align-self: flex-end;
}
</style>
