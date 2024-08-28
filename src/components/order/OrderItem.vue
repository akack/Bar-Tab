<template>
  <div class="mb-2">
    <p class="font-bold">{{ item.name }}</p>
    <div class="w-60">
      <p>Quantity: {{ item.quantity }}</p>
      <p>
        Item Price : <span class="text-cyan-700">{{ currency(item.price) }}</span>
      </p>
      <p>
        Total Price: <span class="text-cyan-700">{{ currency(item.quantity * item.price) }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { currency } from '../../utils/currency'
defineProps({
  item: {
    type: Object
  }
})
</script>
