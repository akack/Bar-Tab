import type { Beverage } from '@/models/Beverage';
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useOrderStore = defineStore('order', () => {
  const beverages = ref([
    {
      id: 1,
      name: 'Beer',
      price: 4500,
      quantity: 0,
      types: ['Amstel', 'Henekein', 'Corona', 'Stella'],
    }, // amount in cents
    { id: 2, name: 'Cider', price: 5200, quantity: 0, types: ['Savanna', 'Brutal Fruit'] },
    { id: 3, name: 'Premix', price: 5900, quantity: 0, types: ['Cock Tail', 'Mock Tail'] },
  ] as Beverage[]);

  const order = ref({} as any);

  const total = computed(() => {
    return Object.values(order.value).reduce((sum: number, item: any) => sum + item.quantity * item.price, 0);
  });

  const updateOrder = (beverageId: number, quantity: number) => {
    if (quantity > 0) {
      order.value[beverageId] = { ...beverages.value.find((b) => b.id === beverageId), quantity };
    } else {
      delete order.value[beverageId];
    }
  };

  const bill = ref({
    noOfPeople: 0,
    amountPerPerson: '',
  });

  const reset = () => {
    order.value = {};
  };

  return {
    beverages,
    order,
    total,
    updateOrder,
    bill,
    reset,
  };
});
