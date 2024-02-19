// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Nothing, NothingData, NothingPatch, NothingQuery } from './nothing.schema'

export type { Nothing, NothingData, NothingPatch, NothingQuery }

export interface NothingParams extends MongoDBAdapterParams<NothingQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class NothingService<ServiceParams extends Params = NothingParams> extends MongoDBService<
  Nothing,
  NothingData,
  NothingParams,
  NothingPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('nothing'))
  }
}
