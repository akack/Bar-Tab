<template>
  <button class="bg-cyan-700 mr-2 p-2 rounded text-white hover:bg-cyan-600" @click="exportTab">
    Export as {{ format }}
  </button>
</template>

<script setup lang="ts">
import { useOrderStore } from '../stores/orderStore'
import { exportToCSV, exportToPDF } from '../utils/billReceipt'
import { computed } from 'vue'

const props = defineProps({
  format: {
    type: String,
    default: 'CSV'
  }
})

const orderStore = useOrderStore()
const order = computed(() => orderStore.order)

const exportTab = () => {
  if (props.format === 'CSV') {
    exportToCSV(order.value)
  } else if (props.format === 'PDF') {
    exportToPDF(order.value)
  }
}
</script>
