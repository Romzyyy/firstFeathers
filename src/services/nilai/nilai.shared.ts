// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Nilai, NilaiData, NilaiPatch, NilaiQuery, NilaiService } from './nilai.class'

export type { Nilai, NilaiData, NilaiPatch, NilaiQuery }

export type NilaiClientService = Pick<NilaiService<Params<NilaiQuery>>, (typeof nilaiMethods)[number]>

export const nilaiPath = 'nilai'

export const nilaiMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const nilaiClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(nilaiPath, connection.service(nilaiPath), {
    methods: nilaiMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [nilaiPath]: NilaiClientService
  }
}
