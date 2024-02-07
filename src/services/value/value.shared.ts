// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Value, ValueData, ValuePatch, ValueQuery, ValueService } from './value.class'

export type { Value, ValueData, ValuePatch, ValueQuery }

export type ValueClientService = Pick<ValueService<Params<ValueQuery>>, (typeof valueMethods)[number]>

export const valuePath = 'value'

export const valueMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const valueClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(valuePath, connection.service(valuePath), {
    methods: valueMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [valuePath]: ValueClientService
  }
}
