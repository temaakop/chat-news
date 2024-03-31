<script lang="ts" setup>
import { Size, Variant } from '@/types/types'
import { defineProps } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: Variant.Primary,
    validator: (value: string) => Object.values(Variant).includes(value as Variant)
  },
  size: {
    type: String,
    default: Size.Medium,
    validator: (value: string) => Object.values(Size).includes(value as Size)
  }
})

const buttonClasses = ['btn', props.variant, props.size]
</script>

<template>
  <button :class="buttonClasses" v-bind="$attrs" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;

  transition: background-color 0.3s ease;
}

.primary {
  background-color: #007bff;
  color: #fff;
}

.secondary {
  background-color: #6c757d;
  color: #fff;
}

.success {
  background-color: #28a745;
  color: #fff;
}

.danger {
  background-color: #dc3545;
  color: #fff;
}

.warning {
  background-color: #ffc107;
  color: #212529;
}

.info {
  background-color: #17a2b8;
  color: #fff;
}

.btn:hover {
  cursor: pointer;
}

.small {
  font-size: 12px;
  padding: 5px 10px;
}

.medium {
  font-size: 14px;
  padding: 8px 16px;
}

.large {
  font-size: 16px;
  padding: 10px 20px;
}
</style>
