import type { Order } from '@/models/Order';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTabStore = defineStore('tab', () => {
  const orders = ref([] as Order[]);

  const addOrder = (order: Order) => {
    const tabOrders = [...orders.value];
    tabOrders.push(order);
    orders.value = tabOrders;
  };

  const total = computed(() => {
    return orders.value
      .map((item) => {
        return Object.values(item).reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);
      })
      .reduce((sum, item) => sum + item, 0);
  });

  const reset = () => {
    orders.value = [];
  };

  return {
    orders,
    addOrder,
    total,
    reset,
  };
});
