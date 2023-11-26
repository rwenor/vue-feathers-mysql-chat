import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')



// import io from 'socket.io-client'
// import { feathers } from '@feathersjs/feathers'
// import socketio from '@feathersjs/socketio-client'

// const socket = io('http://localhost:3030')
// const client = feathers()

// client.configure(socketio(socket))

// const messageService = client.service('messages')

// messageService.on('created', (message) => console.log('Created a message', message))

// // Use the messages service from the server
// messageService.create({
//   text: 'Message from client'
// })