// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Nama, NamaData, NamaPatch, NamaQuery, NamaService } from './nama.class'

export type { Nama, NamaData, NamaPatch, NamaQuery }

export type NamaClientService = Pick<NamaService<Params<NamaQuery>>, (typeof namaMethods)[number]>

export const namaPath = 'nama'

export const namaMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const namaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(namaPath, connection.service(namaPath), {
    methods: namaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [namaPath]: NamaClientService
  }
}
