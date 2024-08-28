<template>
  <div class="my-4">
    <h2 class="text-cyan-700 underline mb-2 font-bold">Order Summary</h2>
    <ul>
      <li class="text-sm" v-for="item in orderItems" :key="item.id">
        <OrderItem :item="item" :key="item.id" />
      </li>
    </ul>
    <h3 class="mt-2 text-cyan-700"><span class="font-bold text-black">Total:</span> {{ currency(total) }}</h3>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '../../stores/orderStore';
import { computed } from 'vue';
import { currency } from '../../utils/currency';
import OrderItem from './OrderItem.vue';

const orderStore = useOrderStore();

const orderItems = computed(() => orderStore.order);
const total = computed(() => orderStore.total);
</script>
