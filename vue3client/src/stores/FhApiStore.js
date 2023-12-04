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
    },

    async login(email, password) {
      let res = {};
      this.user = ''; 
      try {
        if (!email || !password) {
          res = await fhClient.reAuthenticate()
        } else {
          res = await fhClient.authenticate({
            strategy: 'local',
            email,
            password
          })
        }
        console.log('User loggedin: ', res)
        this.user = res.user;
        return res;
      } catch (err) {
        console.error('Authentication error', err.message)
        return err.message;
      }
    },

    async logout(){
      await fhClient.logout();
    },
    
    async createUser (credentials) {
      try {
        let user = await usersService.create(credentials)                        
        console.log('User created: ')
        return user;
      } catch (err) {
        console.error('UserCreate error:', err)
        return err.message;
      }
    },
    async patchUser(credentials){
      console.log(credentials)
      try{
        let res = await usersService.patch(credentials.id, {...credentials})
        return res;
      } catch(err){
        console.log(err);
        return err.message;
      }
    },

    async deleteUser(credentials){
      try{
        return await usersService.remove(credentials.id)
      } catch(err){
        console.log(err)
        return err.message
      }
    },

    async getUsers () {
      try {
        let users = await usersService.find()
        this.users = users.data
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
        let message = await messagesService.remove(id)
        jLog(message, 'delete message:')
        await this.getMessages()
      } catch (err) {
        cLog(err)
      }
    },

    async createMessage (text) {
      try {
        //debugger
        let message = await messagesService.create({text})
        jLog(message, 'create message:')
        await this.getMessages()
      } catch (err) {
        cLog(err)
      }
    },
  }
  
  
})


// debugger
// let usersApi = client.service('users')