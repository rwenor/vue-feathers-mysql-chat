<script setup>
  import MessageElement from './MessageElement.vue'

  import {useFhApiStore} from '../stores/FhApiStore'
  let fhApiStore = useFhApiStore()

  import {useCounterStore} from '../stores/counter'
  const cntStore = useCounterStore()
</script>

<template>

<div>
  <h3>
      You’ve successfully created a project with XYZ {{cntStore.count}}
      <br>
      <button @click="cntStore.randomizeCounter()">Randomize</button>
      
    </h3>
  <h1>{{fhApiStore.user}}</h1>

  <h3>MsgList</h3>
  <div v-if="fhApiStore.messages.length === 0"> -- Ingen meldinger -- </div>  
  <MessageElement v-for="message in fhApiStore.messages" :key="message.id" :msgEl="message">
    <button @click="fhApiStore.deleteMessage(message.id)"> - </button>
  </MessageElement>
 
</div>

</template>
