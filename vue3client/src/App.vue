<script setup>
import { ref, onMounted  } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import {useFhApiStore} from './stores/FhApiStore'

let fhApiStore = useFhApiStore()
fhApiStore.login('hello@feathersjs.com', 'supersecret')
fhApiStore.getUsers()
fhApiStore.getMessages()
fhApiStore.createMessage('User logdin: '+ fhApiStore.user)


const newMsg = ref('Test')

const addNewMsg = () => {
  //debugger
  console.log(newMsg.value)
  fhApiStore.createMessage(newMsg.value)
  newMsg.value = ''
}


const newMsgDomRef = ref(null)  // refrens input in dome

onMounted(() => {
  debugger
  newMsgDomRef.value.focus()
})

const addnewMsgDomRef = () => {
  debugger
  console.log(newMsgDomRef.value.value)
  fhApiStore.createMessage(newMsgDomRef.value.value)
  newMsgDomRef.value.value = ''
}

// debugger
</script>

<template>
  <header>

    <hello-world msg="You did it!"/>

    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      {{fhApiStore.test}} 
      <br>
      {{fhApiStore.user}}


      <button @click="fhApiStore.getMessages()">getMessages</button>
      
      <button @click="fhApiStore.getUsers()">getUsers</button>
      

      <button @click="fhApiStore.login('hello@feathersjs.com', 'supersecret'); ">Login</button>
      <button @click="fhApiStore.setUser()">setUser</button>
      
      <!-- {{fhApiStore.users}} -->
      <table>
        <tr><th>email</th></tr>
        <tr v-for="user in fhApiStore.users">
          <td>{{user.email}}</td>
        </tr>
      </table>
YYY
        <table>
          <tr><th>email</th><th>msg</th><th></th>func.</tr>
          <tr v-for="message in fhApiStore.messages" :key="message.id">
            <td>{{message.user.email}}</td>
            <td>{{message.text}}</td>
            <td>
              <button @click="fhApiStore.deleteMessage(message.id)"> - </button>
            </td>
          </tr>
        </table> 
        <!-- {{newMsg}} -->

        <br>
        <h3>v-modal</h3>
        <input type="text" 
          v-model="newMsg" 
          v-on:keyup.enter="addNewMsg">

        <br>
        <h3>By ref</h3>
        <input type="text" 
          ref="newMsgDomRef"
          v-on:keyup.enter="addnewMsgDomRef">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
