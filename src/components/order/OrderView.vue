<template>
  <div>
    <h1 class="font-bold text-cyan-700 text-2xl underline text-center">PLACE YOUR ORDER NOW</h1>
    <p class="text-red-500 text-center" v-if="errorMessage">{{ errorMessage }}</p>
    <hr class="my-4 divider-y" />
    <div class="flex flex-wrap justify-center gap-8">
      <div class="md:w-auto">
        <BeverageList />
        <OrderSummary />
      </div>
      <div class="md:w-auto">
        <Bill />
        <BarTabButton @click="submitOrder" :label="'Place Order'" />
        <ExportButton format="CSV" v-if="tabStore.total" />
        <ExportButton format="PDF" v-if="tabStore.total" />
      </div>
    </div>
    <hr class="my-4 divider-y" />
    <div class="grid justify-center">
      <TabItems :orders="orders" :total="tabTotal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BeverageList from '../beverage/BeverageList.vue';
import OrderSummary from './OrderSummary.vue';
import Bill from '../bill/Bill.vue';
import ExportButton from '../ExportButton.vue';
import { useOrderStore } from '../../stores/orderStore';
import { useTabStore } from '../../stores/tabStore';
import { computed, ref } from 'vue';
import TabItems from '../tab/TabItems.vue';
import BarTabButton from '../BarTabButton.vue';
import * as _ from 'lodash';

const orderStore = useOrderStore();
const tabStore = useTabStore();

let tabTotal = ref(0);

const orders = computed(() => tabStore.orders);

const errorMessage = ref('');

const submitOrder = () => {
  errorMessage.value = '';
  if (_.isEmpty(orderStore.order)) {
    errorMessage.value = 'Please select beverages to place an order.';
  } else {
    tabStore.addOrder(orderStore.order);
    tabTotal.value = tabStore.total as any;
    orderStore.order = {};
  }
};
</script>
