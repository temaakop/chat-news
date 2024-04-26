//[], lj, добавить анимации включения/выключения натсроек пользователя

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { requestOnChangesName, getUserInfo } from '@/api/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputComponent from '../InputComponent.vue'
import ButtonComponent from '../ButtonComponent.vue'
import SelectComponent from '../SelectComponent.vue'
import DatePicker from '../DatePicker.vue'

const emits = defineEmits<{
  (e: 'closeModal'): void
}>()

const userStore = useUserStore()
const router = useRouter()

const newName = ref('')
const userAvatarURL = ref('')
const userBirthDay = ref('')

const handleClick = async () => {
  requestOnChangesName(userStore.token, newName.value)
  const userInfo = await getUserInfo(userStore.token)
  userStore.setUserName(userInfo.name)
}

const handleChanges = (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    userAvatarURL.value = URL.createObjectURL(file)
  }
}

const handleSubmit = () => {
  userStore.setUserAvatarUrl(userAvatarURL.value)
}

const updateDate = (date) => {
  userBirthDay.value = date
}
</script>

<template>
  <div class="container">
    <div class="container__user-info">
      <div class="user-info__header">
        <h3>Информация о пользователе:</h3>
        <button @click="emits('closeModal')">X</button>
      </div>
      <date-picker @date-change="updateDate"> </date-picker>
      <div>{{ userBirthDay }}</div>
      <input type="date" />
      <div class="user-info">
        <p>E-mail :</p>
        <p class="text">{{ userStore.email }}</p>
      </div>
      <div class="user-info">
        <p>Имя :</p>
        <p class="text">{{ userStore.userName }}</p>
      </div>
      <form class="changes-name">
        <input-component v-model="newName" type="text"> Nikckname </input-component>

        <button-component @click="handleClick" class="changes-name__button"
          >Изменить</button-component
        >
      </form>
      <form @submit.prevent="handleSubmit">
        <input-component @change="handleChanges" type="file"></input-component>
        <button-component>Изменить аватар</button-component>
      </form>
      <input-component @change="handleChanges" type="date"> </input-component>
      <!-- <button @click="router.push('/')" class="exit">Выйти из профиля</button>
      <SelectComponent
        id="userBirthDayForm"
        v-model="userBirthDay"
        :disabled="false"
        :items="[{ text: 'sadasd', value: 'asdas' }]"
      >
        Дата рождения:</SelectComponent
      >  -->
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
  color: rgb(83, 83, 83);
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
  background-color: rgb(255, 255, 255);
}

.user-info__header {
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
form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}
/* .changes-name input {
  width: 100%;
  margin-right: 15px;
} */
.exit {
  align-self: flex-end;
}
</style>
