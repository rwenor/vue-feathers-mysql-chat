<template>
  <span class="flex-container"> 
    <div>{{msgEl.id}}</div>
    <div>{{msgEl.text}}</div>
    <div>{{msgEl.user.email}}</div>
    
    <!-- <div>{{msgEl}}</div> -->
    <slot></slot>
    
  </span>
</template>

<script setup>
defineProps({
  msgEl: {
    type: Object,
    required: true
  }
})
</script>

<style>
.flex-container {
  display: flex;
  background-color: DodgerBlue;
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 2px;
  padding: 2px;
  font-size: 18px;
}
</style>