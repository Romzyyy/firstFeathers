// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Input, InputData, InputPatch, InputQuery, InputService } from './input.class'

export type { Input, InputData, InputPatch, InputQuery }

export type InputClientService = Pick<InputService<Params<InputQuery>>, (typeof inputMethods)[number]>

export const inputPath = 'input'

export const inputMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const inputClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(inputPath, connection.service(inputPath), {
    methods: inputMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [inputPath]: InputClientService
  }
}
