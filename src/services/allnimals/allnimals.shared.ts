// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Allnimals,
  AllnimalsData,
  AllnimalsPatch,
  AllnimalsQuery,
  AllnimalsService
} from './allnimals.class'

export type { Allnimals, AllnimalsData, AllnimalsPatch, AllnimalsQuery }

export type AllnimalsClientService = Pick<
  AllnimalsService<Params<AllnimalsQuery>>,
  (typeof allnimalsMethods)[number]
>

export const allnimalsPath = 'allnimals'

export const allnimalsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const allnimalsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(allnimalsPath, connection.service(allnimalsPath), {
    methods: allnimalsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [allnimalsPath]: AllnimalsClientService
  }
}
