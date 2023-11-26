import io from 'socket.io-client'
import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const cLog = console.log
const eLog = console.error
const jLog = (j) => cLog(JSON.stringify(j, null, 2))


const socket = io('http://localhost:3030') 
const fhClient = feathers()
fhClient.configure(socketio(socket))
fhClient.configure(authentication())

const messageService = fhClient.service('messages')

messageService.on('created', (message) => console.log('Created a message', message))

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function login(email, password) {
  try {
    // Authenticate with the local email/password strategy
    let user = await fhClient.authenticate({
      strategy: 'local',
      email,
      password
    })
    console.log('User loggedin: ')
    jLog(user)
    
    return user
    // Show e.g. logged in dashboard page
  } catch (err) {
    // Show login page (potentially with `e.message`)
    console.error('Authentication error', err)
  }
}

async function main() {

  login("hello@feathersjs.com", "supersecret")

  try {
    // Use the messages service from the server
    let res = await messageService.create({
        text: 'Message from client'
      })

    cLog('Res: ')
    cLog(res)

  } catch (err) {
    cLog(err)
  }
  cLog('Wait...')
  await sleep(2000)
  cLog('Done!')  

  process.exit()
}

main()