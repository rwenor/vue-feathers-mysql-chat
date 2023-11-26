<script setup>
import {useCounterStore} from '../stores/counter'

defineProps({
  msg: {
    type: String,
    required: true
  }
})

const cntStore = useCounterStore()
// call the action as a method of the Store
cntStore.randomizeCounter()

</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with XYZ {{cntStore.count}}
      <br>
      <button @click="cntStore.randomizeCounter()">Randomize</button>
      
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
