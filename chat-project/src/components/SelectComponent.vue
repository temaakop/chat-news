<script setup lang="ts">
import { defineProps, defineModel } from 'vue'

const selectedItem = defineModel()

interface PropsType {
  items: Array<{
    text: string
    value: string
  }>
  id: string
  disabled: boolean
}

const props = defineProps<PropsType>()
</script>

<template>
  <label :for="id">
    <slot></slot>
  </label>
  <select :disabled="disabled" :id="id" class="select" v-model="selectedItem">
    <option v-for="item in items" :value="item.value" :key="item.value">
      {{ item.text }}
    </option>
  </select>
</template>

<style computed>
.select {
  appearance: none;
  display: block;
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;

  border: 2px solid #ced4da;
  border-radius: 0.25rem;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.select:focus {
  outline: none;
  border-color: #007bff;
}

.select option {
  background-color: #fff;
  color: #333;
}

.select::-ms-expand {
  display: none;
}

.select:hover {
  border-color: #999;
}

.select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
