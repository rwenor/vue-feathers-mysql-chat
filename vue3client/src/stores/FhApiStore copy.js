"use strict";

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import io from 'socket.io-client'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const cLog = console.log
const jLog = (j, h) => {
  if (h) cLog(h)
  cLog(JSON.stringify(j, null, 2))
}
//import { client, User } from '../fhClient'

const socket = io('http://localhost:3030') 

const fhClient = feathers()
fhClient.configure(socketio(socket))
fhClient.configure(authentication())

const messagesService = fhClient.service('messages')
const usersService = fhClient.service('users')

export const useFhApiStore = defineStore('FhApiStore', {
  state: () => ({
    test: 'TEST',
    user: '', 
    users: [],
    messages: [],
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

    async getUsers () {
      try {
        //debugger
        let users = await usersService.find()
        this.users = users.data
        jLog(users, 'users:')
      } catch (err) {
        cLog(err)
      }
    },

    async getMessages () {
      try {
        //debugger
        let messages = await messagesService.find()
        this.messages = messages.data
        jLog(messages, 'messages:')
      } catch (err) {
        cLog(err)
      }
    },

    async deleteMessage (id) {
      try {
        //debugger
        let messages = await messagesService.remove(id)
        this.messages = messages.data
        jLog(messages, 'delete message:')
      } catch (err) {
        cLog(err)
      }
    },
  }
  
  
})


// debugger
// let usersApi = client.service('users')