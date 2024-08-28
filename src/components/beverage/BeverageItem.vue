<template>
  <div class="flex my-4">
    <div class="w-60">
      <label>{{ beverage.name }}</label>
      <span class="text-xs"> ({{ beverage.types.join(',') }})</span>
    </div>
    <div class="w-20">
      <input
        class="w-20 border p-2"
        type="number"
        v-model.number="quantity"
        min="0"
        @input="handleInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore.ts'

const props = defineProps({
  beverage: Object
})
const orderStore = useOrderStore()

const quantity = computed({
  get: () => orderStore.order[props.beverage.id]?.quantity || 0,
  set: (value) => orderStore.updateOrder(props.beverage.id, value)
})

const handleInput = () => {
  orderStore.updateOrder(props.beverage.id, quantity.value)
}
</script>
