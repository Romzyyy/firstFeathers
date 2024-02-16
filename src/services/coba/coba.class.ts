// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Coba, CobaData, CobaPatch, CobaQuery } from './coba.schema'

export type { Coba, CobaData, CobaPatch, CobaQuery }

export interface CobaParams extends MongoDBAdapterParams<CobaQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class CobaService<ServiceParams extends Params = CobaParams> extends MongoDBService<
  Coba,
  CobaData,
  CobaParams,
  CobaPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('coba'))
  }
}
