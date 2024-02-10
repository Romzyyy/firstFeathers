// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Nilai, NilaiData, NilaiPatch, NilaiQuery } from './nilai.schema'

export type { Nilai, NilaiData, NilaiPatch, NilaiQuery }

export interface NilaiParams extends MongoDBAdapterParams<NilaiQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class NilaiService<ServiceParams extends Params = NilaiParams> extends MongoDBService<
  Nilai,
  NilaiData,
  NilaiParams,
  NilaiPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('nilai'))
  }
}
