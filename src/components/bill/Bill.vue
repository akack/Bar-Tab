<template>
  <div class="mb-4">
    <h2 class="text-cyan-700 underline font-bold mb-2">Bill Receipt</h2>
    <div class="flex mb-2">
      <div class="w-60">
        <p class="font-bold text-black">Total:</p>
      </div>
      <p class="text-cyan-700">
        {{ currency(total) }}
      </p>
    </div>
    <div class="flex">
      <div class="w-60">
        <label>Split bill:</label>
        <p class="text-xs">Number of people to split with:</p>
      </div>
      <input
        class="border w-20 text-center p-2"
        type="number"
        v-model.number="peopleCount"
        min="1"
      />
    </div>

    <div class="flex mt-2">
      <div class="w-60">
        <p class="text-sm">Amount per person:</p>
      </div>
      <p class="text-cyan-700 text-sm">{{ currency(totalPerPerson) }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { computed, ref } from 'vue'
import { useOrderStore } from '../../stores/orderStore'
import { currency } from '../../utils/currency'

const peopleCount = ref(1)
const orderStore = useOrderStore()
const total = computed(() => orderStore.total)

watch(peopleCount, (newValue) => {
  orderStore.bill = {
    noOfPeople: newValue,
    amountPerPerson: currency(parseFloat(total.value.toString()) / peopleCount.value)
  } as any
})

watch(orderStore.order, () => {
  orderStore.bill = {
    noOfPeople: peopleCount.value,
    amountPerPerson: currency(parseFloat(total.value.toString()) / peopleCount.value)
  } as any
})

const totalPerPerson = computed(() =>
  (parseFloat(total.value.toString()) / peopleCount.value).toFixed(2)
)
</script>
