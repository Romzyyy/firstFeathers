// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { First, FirstData, FirstPatch, FirstQuery, FirstService } from './first.class'

export type { First, FirstData, FirstPatch, FirstQuery }

export type FirstClientService = Pick<FirstService<Params<FirstQuery>>, (typeof firstMethods)[number]>

export const firstPath = 'first'

export const firstMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const firstClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(firstPath, connection.service(firstPath), {
    methods: firstMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [firstPath]: FirstClientService
  }
}
