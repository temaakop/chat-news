//[], добавить варианты смещения label влево и вправо

<script setup lang="ts">
import { Size, InputVariant, LabelPosition } from '@/types/types'
import { computed, ref } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: InputVariant.Primary,
    validator: (value: string) => Object.values(InputVariant).includes(value as InputVariant)
  },
  size: {
    type: String,
    default: Size.Medium,
    validator: (value: string) => Object.values(Size).includes(value as Size)
  },
  labelPosition: {
    type: String,
    default: LabelPosition.Top
  }
})

const modelValue = defineModel()

const inputClasses = computed(() => ['input', props.size, props.variant])
</script>

<template>
  <div class="input__container">
    <input
      :class="inputClasses"
      v-model="modelValue"
      id="input-field"
      class="input-filed"
      v-bind="$attrs"
    />
    <label
      for="input-field"
      class="input-label"
      :class="{
        active: modelValue,
        labelPosition
      }"
    >
      <slot></slot>
    </label>
  </div>
</template>

<style scoped>
.input__container {
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
}
.input {
  display: block;
  width: 100%;
  padding: 5px;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  border: 1px solid bisque;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.input:focus {
  outline: none;
}

.input-label {
  position: absolute;
  top: 50%; /* Расстояние между label и input */
  left: 5px;
  transform: translateY(-50%);
  color: #999;
  pointer-events: none;
  transition: 0.2s;
}

.input-label.active {
  top: -1rem;
  color: #f7f8fa;
  border-color: #2a2c2e;
}
.input-label.bottom.active {
  top: 3rem;
}

.input:focus + .input-label,
.input:focus-within + .input-label {
  top: -1rem;
  color: #f7f8fa;
}

.input:focus + .input-label.bottom,
.input:focus-within + .input-label.bottom {
  top: 3rem;
  color: #f7f8fa;
}

/* Вариация: увеличенный размер */
.large {
  padding: 1rem;
  font-size: 1.25rem;
}

.small {
  padding: 0.75rem;
  font-size: 1rem;
}

/* Вариация: ошибка валидации */
.error {
  border-color: #dc3545;
}

/* Вариация: успешная валидация */
.success {
  border-color: #28a745;
}

/* Вариация: с подсветкой */
.highlight {
  background-color: #f8f9fa;
}

/* Вариация: с закругленными углами */
.rounded {
  border-radius: 0.5rem;
}

/* Вариация: без рамки */
.borderless {
  border: none;
  border-bottom: 1px solid #ced4da;
  border-radius: 0;
}

/* Вариация: с прозрачным фоном */
.transparent {
  background-color: transparent;
}

/* Вариация: с выделением при фокусе */
.highlight:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
