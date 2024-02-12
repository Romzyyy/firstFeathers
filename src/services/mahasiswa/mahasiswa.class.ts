// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Mahasiswa, MahasiswaData, MahasiswaPatch, MahasiswaQuery } from './mahasiswa.schema'

export type { Mahasiswa, MahasiswaData, MahasiswaPatch, MahasiswaQuery }

export interface MahasiswaParams extends MongoDBAdapterParams<MahasiswaQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class MahasiswaService<ServiceParams extends Params = MahasiswaParams> extends MongoDBService<
  Mahasiswa,
  MahasiswaData,
  MahasiswaParams,
  MahasiswaPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('mahasiswa'))
  }
}
