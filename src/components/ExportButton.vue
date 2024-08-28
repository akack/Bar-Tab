<template>
  <button class="bg-cyan-700 mr-2 p-2 rounded text-white hover:bg-cyan-600" @click="exportTab">
    Export {{ format }}
  </button>
</template>

<script setup lang="ts">
import { exportToCSV, exportToPDF } from '../utils/billReceipt';
import { useTabStore } from '../stores/tabStore';

const props = defineProps({
  format: {
    type: String,
    default: 'CSV',
  },
});

const tabStore = useTabStore();

const exportTab = () => {
  if (props.format === 'CSV') {
    exportToCSV(tabStore.orders);
  } else if (props.format === 'PDF') {
    exportToPDF(tabStore.orders);
  }
};
</script>
