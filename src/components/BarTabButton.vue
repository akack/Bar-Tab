<template>
  <button
    class="bg-cyan-700 rounded w-100 relative h-10 text-white hover:bg-cyan-600 disabled:opacity-50 disabled:bg-gray-600 p-2 mr-2"
    :disabled="isLoading"
  >
    <b-spinner class="text-brand-700" v-if="isLoading" small />
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  isLoading?: boolean;
  label: string;
}>();
</script>
