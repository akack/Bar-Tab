<template>
  <div class="justify-items-center">
    <div class="flex flex-wrap justify-center gap-8">
      <div class="md:w-auto">
        <BeverageList />
        <OrderSummary />
      </div>
      <div class="md:w-auto">
        <Bill />
        <ExportButton format="CSV" v-if="total" />
        <ExportButton format="PDF" v-if="total" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BeverageList from '../beverage/BeverageList.vue'
import OrderSummary from './OrderSummary.vue'
import Bill from '../bill/Bill.vue'
import ExportButton from '../ExportButton.vue'
import { useOrderStore } from '../../stores/orderStore'
import { computed } from 'vue'

const orderStore = useOrderStore()
const total = computed(() => orderStore.total)
</script>
