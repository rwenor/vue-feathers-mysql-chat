// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app.js'

describe('messages service', () => {
  it('registered the service', () => {
    const service = app.service('messages')

    assert.ok(service, 'Registered the service')
  })

  it('can create a new message for a user', async () => {
    const user = await app.service('users').create({
      email: 'test@feathersjs.com',
      password: 'supersecret'
    })

    const message = await app.service('messages').create(
      {
        text: 'Hello world'
      },
      { user }
    )

    assert.strictEqual(message.userId, user.id)

    await app.service('messages').remove(message.id)
    await app.service('users').remove(user.id)
  })
})
