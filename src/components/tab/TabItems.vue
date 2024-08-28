<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%] sm:w-[500px] md:w-[600px] xl:w-[700px] p-2">
    <h2 class="underline text-cyan-700 font-bold mb-4 text-2xl">Customer Open Tab</h2>
    <p class="text-sm text-gray-600" v-if="!orders.length">No active tab for the customer</p>
    <div v-else>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th class="px-6 py-3">Order Number</th>
            <th class="px-6 py-3">Items</th>
            <th class="px-6 py-3">total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="odd:bg-white even:bg-gray-50 even:dark:bg-gray-200 border-b dark:border-gray-200"
            v-for="order in tabOrders"
            :key="order.id"
          >
            <td class="px-6 py-3">{{ getOrderId(order) }}</td>
            <td class="px-6 py-3">{{ getQuantity(order) }}</td>
            <td class="px-6 py-3">{{ currency(calculateTotals(order)) }}</td>
          </tr>
          <tr>
            <td class="px-6 py-3"></td>
            <td class="px-6 py-3"></td>
            <td class="px-6 py-3">{{ currency(props.total) }}</td>
          </tr>
        </tbody>
      </table>
      <BarTabButton :label="'Close Tab'" @click="closeTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useOrderStore } from '../../stores/orderStore';
import { useTabStore } from '../../stores/tabStore';
import { currency } from '../../utils/currency';
import BarTabButton from '../BarTabButton.vue';

const orderStore = useOrderStore();
const tabStore = useTabStore();

const props = defineProps({
  orders: Array,
  total: String,
});

const calculateTotals = (data: any) => {
  let totalSum = 0;

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      totalSum += item.price * item.quantity;
    }
  }

  return totalSum;
};

const getQuantity = (data: any) => {
  let quantity = 0;

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      quantity += item.quantity;
    }
  }

  return quantity;
};

const getOrderId = (data: any) => {
  let id = 0;

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      id = item.id;
    }
  }

  return id;
};

const tabOrders = computed(() => props.orders);

const closeTab = () => {
  orderStore.reset();
  tabStore.reset();
};
</script>
