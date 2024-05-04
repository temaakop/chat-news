<script lang="ts" setup>
import { Size, ButtonVariant } from '@/types/types'
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: ButtonVariant.Primary,
    validator: (value: string) => Object.values(ButtonVariant).includes(value as ButtonVariant)
  },
  size: {
    type: String,
    default: Size.Medium,
    validator: (value: string) => Object.values(Size).includes(value as Size)
  },
  rounded: {
    type: Boolean,
    default: false
  }
})

const buttonClasses = computed(() => ['btn', props.variant, props.size])
</script>
<template>
  <button :class="[buttonClasses, rounded ? 'rounded-btn' : '']" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  max-width: 100px;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* padding: 0.5rem 1rem; */
  border: 1px solid transparent;
  border-radius: 0.25rem;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.btn.rounded-btn {
  font-size: large;
  width: 40px;
  height: 35px;
  border-radius: 50%;
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
  filter: brightness(0.4);
  transform: scale(1.05);
}

.small {
  font-size: 8px;
  padding: 3px 5px;
}

.medium {
  font-size: 12px;
  padding: 4px 8px;
}

.large {
  font-size: 16px;
  padding: 10px 20px;
}
</style>
