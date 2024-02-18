// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('input service', () => {
  it('registered the service', () => {
    const service = app.service('input')

    assert.ok(service, 'Registered the service')
  })
})
