// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Nama, NamaData, NamaPatch, NamaQuery } from './nama.schema'

export type { Nama, NamaData, NamaPatch, NamaQuery }

export interface NamaParams extends MongoDBAdapterParams<NamaQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class NamaService<ServiceParams extends Params = NamaParams> extends MongoDBService<
  Nama,
  NamaData,
  NamaParams,
  NamaPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('nama'))
  }
}
