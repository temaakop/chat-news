// [] Исправить баг с отправкой даты введной пользователем, месяц пееключается на один вперед при
сабмите, из-за format()

<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from 'vue'
import { validateDate } from '@/utils/utilsSunction'
import { format } from 'date-fns'

const showCalendar = ref<boolean>(false)

const currentDate = new Date()

let currentYear = ref(currentDate.getFullYear())
let currentMonth = ref(currentDate.getMonth())
let currentDay = ref<number>(currentDate.getDay())
const resultDate = ref(currentDate)
const isMonthSelection = ref(false)
const isValid = ref(true)

const props = defineProps({
  userDate: {
    type: String,
    default: '',
    validator: (value: string) => validateDate(value)
  }
})

const emit = defineEmits<{
  (e: 'dateChange', date: Date): void
}>()

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]
const getYears = (initialYears: number, interval: number) => {
  const yearsArray = []
  for (let i = 0; i <= interval; i++) {
    yearsArray.push(initialYears++)
  }
  return yearsArray
}
const initialDate = 'дд.мм.гггг'

onMounted(() => {
  const inputElement = document.querySelector('.input') as HTMLInputElement
  inputElement.value = initialDate
})

const years = getYears(1900, 200)

const formatInputDate = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  let value = inputElement.value.replace(/\D/g, '')
  if (value.length > 8) {
    value = value.slice(0, 8)
  }
  value = value.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3')
  inputElement.value = value
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentYear.value = currentYear.value + 1
    currentMonth.value = 0
    return
  }
  currentMonth.value = currentMonth.value + 1
}

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentYear.value = currentYear.value - 1
    currentMonth.value = 11
    return
  }
  currentMonth.value = currentMonth.value - 1
}

const prevMonthDays = computed(() => {
  const firstDayIndex = new Date(currentYear.value, currentMonth.value, 1).getDay() - 1
  const dayPrevMonth = Array(new Date(currentYear.value, currentMonth.value, 0).getDate())
    .fill('')
    .map((_, index) => index + 1)
  if (firstDayIndex === 0) return []
  if (firstDayIndex < 0) return dayPrevMonth.slice(-6)
  return dayPrevMonth.slice(-firstDayIndex)
})

const nextMonthDays = computed(() => {
  const lastDayIndex = new Date(currentYear.value, currentMonth.value + 1, 0).getDay()
  const dayNextMonth = Array(7 - lastDayIndex)
    .fill('')
    .map((_, index) => index + 1)
  if (lastDayIndex !== 0) return dayNextMonth
  return []
})

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const validateUserDate = (userDate: string) => {
  const validateDate = userDate.split('.').map(Number)
  return validateDate
}

const sendDate = (event: Event) => {
  const inputElement = event.target as HTMLInputElement
  const inputValue = inputElement.value

  if (!validateDate(inputValue)) {
    console.log(validateDate(inputValue))
    console.log(inputValue)
    isValid.value = false
    console.error('Неверный формат даты. Введите дату в формате ДД.ММ.ГГГГ')
  } else {
    isValid.value = true
    const validDate = validateUserDate(inputValue)
    resultDate.value = new Date(validDate[2], validDate[1], validDate[0])
  }
  emit('dateChange', resultDate.value)
}

// const handleSubmit = (event: Event) => {
//   const inputElement = event.target as HTMLInputElement
//    const validDate = validateUserDate(inputElement.value)
//   resultDate.value = new Date()
//   emit('dateChange', resultDate.value)
// }

const pickDay = (dayNumber: number) => {
  currentDay.value = dayNumber
  isValid.value = true
  resultDate.value = new Date(currentYear.value, currentMonth.value, currentDay.value)
  emit('dateChange', resultDate.value)
}
</script>

<template>
  <div class="datepicker">
    <input
      class="input"
      :value="format(new Date(resultDate), 'dd.MM.yyyy')"
      :class="{ 'input-error': !isValid }"
      @submit="sendDate"
      @change="sendDate"
      type="text"
      @click="showCalendar = !showCalendar"
      @input="formatInputDate"
      pattern="(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}"
      title="Введите дату в формате ДД.ММ.ГГГГ"
    />
    <div class="calendar" v-if="showCalendar">
      <div class="calendar__header">
        <button @click="prevMonth" class="calendar__header__button back"><</button>
        <div class="calendar__header__navigation">
          <div
            class="calendar___header__months"
            @click="isMonthSelection = true"
            v-if="!isMonthSelection"
          >
            {{ months[currentMonth] }}
          </div>

          <select
            class="calendar___header__years"
            :value="currentYear"
            @change="
              (e: Event) => {
                const target = e.target as HTMLInputElement
                currentYear = Number(target.value)
              }
            "
          >
            <option
              :value="year"
              v-for="(year, index) of years"
              :key="index"
              :selected="index === currentYear"
            >
              {{ year }}
            </option>
          </select>
        </div>

        <button @click="nextMonth" class="calendar__header__button front">></button>
      </div>
      <div v-if="!isMonthSelection" class="calendar__body days-of-week">
        <div class="calendar__body__cell week-day" v-for="weekDay of daysOfWeek" :key="weekDay">
          {{ weekDay }}
        </div>
      </div>
      <div class="calendar__container__month" v-if="isMonthSelection">
        <div class="calendar__body__month">
          <div
            class="calendar__body__cell"
            @click="
              () => {
                currentMonth = index
                isMonthSelection = false
              }
            "
            v-for="(month, index) of months"
            :key="month"
          >
            {{ month }}
          </div>
        </div>
      </div>
      <div class="calendar__container__days" v-else>
        <div class="calendar__body">
          <div
            @click="prevMonth"
            class="calendar__body__cell prev-month-day"
            v-for="prevDay of prevMonthDays"
            :key="prevDay"
          >
            {{ prevDay }}
          </div>
          <div
            @click="pickDay(day)"
            class="calendar__body__cell"
            :class="{ active: currentDay === day && resultDate.getMonth() === currentMonth }"
            v-for="day of daysInMonth"
            :key="day"
          >
            <span>{{ day }} </span>
          </div>
          <div
            @click="nextMonth"
            class="calendar__body__cell next-month-day"
            v-for="nextDay of nextMonthDays"
            :key="nextDay"
          >
            {{ nextDay }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input.input-error {
  border: 1px solid red;
  color: red;
}

.datepicker {
  position: relative;
  display: flex;
  flex-direction: column;
}

.input {
  font-size: 1rem;
  padding: 5px;
  width: 100%;
  background-color: white;
  border-radius: 0.25rem;
  border: 1px solid bisque;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
}

.input:focus {
  outline: none;
}

.calendar {
  position: absolute;
  top: 125%;
  left: 0;
  padding: 5px;
  width: 300px;
  background-color: white;
  border: 1px solid rgb(58, 56, 56, 0.4);
  border-radius: 0.25rem;
  z-index: 33;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.calendar__header {
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}

.calendar__header__navigation {
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 5px;
  transition: all 0.1s;
}

.calendar__header__navigation:hover {
  background-color: rgb(235, 231, 226);
}

.calendar___header__years {
  width: 80px;
  text-align: center;
}

.calendar___header__years:focus {
  outline: none;
}

.calendar__body {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-top: 5px;
  gap: 5px;
  color: rgb(77, 73, 73);
}

.calendar__body__cell {
  display: flex;
  justify-content: center;
  transition: all linear 0.1s;
  border-radius: 0.25rem;
}

.active {
  background-color: rgb(36, 102, 201);
  color: white;
}

.calendar__body__cell:not(.week-day):not(.active):hover {
  background-color: rgb(235, 231, 226);
}

.calendar__body__month {
  color: black;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}

.calendar__body__month > div {
  height: 50px;
  align-items: center;
}
.days-of-week {
  color: rgb(228, 152, 38);
  padding-bottom: 5px;
  border-bottom: 1px solid black;
}

.prev-month-day,
.next-month-day {
  opacity: 0.5;
}
</style>
