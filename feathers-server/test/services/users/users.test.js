// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('users service', () => {
  it('registered the service', () => {
    const service = app.service('users')

    assert.ok(service, 'Registered the service')
  })

  it('finds all users', async () => {
    const users = await app.service('users').find({
      paginate: false
    })

    // console.log(`users:`)
    // console.log(JSON.stringify(users, null, 2))

    console.info('    User cnt: '+ users.length)
    assert.ok(Array.isArray(users))

  })
})
