<script setup>
import { defineProps } from 'vue';
const props = defineProps(['message'])

</script>

<template>
  <div class="pt-3">
    <div v-if="message.ok == true" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ message.statusText }}
      <button type="button" class="btn-close" @click="message = {}" aria-label="Close"></button>
    </div>

    <div v-if="message.ok == false" class="alert alert-danger alert-dismissible fade show" role="alert">
      Error: {{ message.statusText }}
      <button type="button" class="btn-close" @click="message = {}" aria-label="Close"></button>
    </div>
  </div>
</template>

<style></style>