// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Mahasiswa,
  MahasiswaData,
  MahasiswaPatch,
  MahasiswaQuery,
  MahasiswaService
} from './mahasiswa.class'

export type { Mahasiswa, MahasiswaData, MahasiswaPatch, MahasiswaQuery }

export type MahasiswaClientService = Pick<
  MahasiswaService<Params<MahasiswaQuery>>,
  (typeof mahasiswaMethods)[number]
>

export const mahasiswaPath = 'mahasiswa'

export const mahasiswaMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const mahasiswaClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(mahasiswaPath, connection.service(mahasiswaPath), {
    methods: mahasiswaMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [mahasiswaPath]: MahasiswaClientService
  }
}
