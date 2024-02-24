// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Seconds, SecondsData, SecondsPatch, SecondsQuery, SecondsService } from './seconds.class'

export type { Seconds, SecondsData, SecondsPatch, SecondsQuery }

export type SecondsClientService = Pick<SecondsService<Params<SecondsQuery>>, (typeof secondsMethods)[number]>

export const secondsPath = 'seconds'

export const secondsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const secondsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(secondsPath, connection.service(secondsPath), {
    methods: secondsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [secondsPath]: SecondsClientService
  }
}
