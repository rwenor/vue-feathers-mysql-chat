import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import io from 'socket.io-client'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

//import { client, User } from '../fhClient'

const socket = io('http://localhost:3030') 

const fhClient = feathers()
fhClient.configure(socketio(socket))
fhClient.configure(authentication())

const messageService = fhClient.service('messages')

export const useFhApiStore = defineStore('FhApiStore', {
  state: () => ({
    test: 'TEST',
    user: '', 
  }),

  actions: {
    setUser () {
      debugger
      this.user = 'Rolf'
    },

    async login (email, password) {
      try {
        // Authenticate with the local email/password strategy
        //debugger
        let { user } = await fhClient.authenticate({
          strategy: 'local',
          email,
          password
        })
        console.log('User loggedin: ')
        console.log(JSON.stringify(user, null, 2))
        this.user = user.email
        // Show e.g. logged in dashboard page
      } catch (err) {
        // Show login page (potentially with `e.message`)
        console.error('Authentication error', err)
      }
    },

  }

})


// debugger
// let usersApi = client.service('users')