// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Nothing, NothingData, NothingPatch, NothingQuery, NothingService } from './nothing.class'

export type { Nothing, NothingData, NothingPatch, NothingQuery }

export type NothingClientService = Pick<NothingService<Params<NothingQuery>>, (typeof nothingMethods)[number]>

export const nothingPath = 'nothing'

export const nothingMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const nothingClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(nothingPath, connection.service(nothingPath), {
    methods: nothingMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [nothingPath]: NothingClientService
  }
}
