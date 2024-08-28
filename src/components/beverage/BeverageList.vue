<template>
  <div>
    <h2 class="text-cyan-700 underline font-bold">Beverages</h2>
    <p class="text-xs">Select number of beverages to place order:</p>
    <BeverageItem v-for="bev in beverages" :key="bev.id" :beverage="bev" />
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '../../stores/orderStore'
import BeverageItem from '../beverage/BeverageItem.vue'

const orderStore = useOrderStore()
const beverages = orderStore.beverages
</script>
