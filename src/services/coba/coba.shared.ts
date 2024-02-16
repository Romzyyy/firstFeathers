// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Coba, CobaData, CobaPatch, CobaQuery, CobaService } from './coba.class'

export type { Coba, CobaData, CobaPatch, CobaQuery }

export type CobaClientService = Pick<CobaService<Params<CobaQuery>>, (typeof cobaMethods)[number]>

export const cobaPath = 'coba'

export const cobaMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const cobaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(cobaPath, connection.service(cobaPath), {
    methods: cobaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [cobaPath]: CobaClientService
  }
}
