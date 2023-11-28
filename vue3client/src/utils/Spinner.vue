<script setup>
import { defineProps } from 'vue';
const props = defineProps(['loadingSpinner'])
</script>

<template>
  <span v-if="loadingSpinner" class="spinner-border spinner-border-sm ms-2" role="status">
    <span class="sr-only">Loading</span>
  </span>
</template>
