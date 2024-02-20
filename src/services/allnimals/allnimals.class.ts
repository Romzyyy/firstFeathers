// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Allnimals, AllnimalsData, AllnimalsPatch, AllnimalsQuery } from './allnimals.schema'

export type { Allnimals, AllnimalsData, AllnimalsPatch, AllnimalsQuery }

export interface AllnimalsParams extends MongoDBAdapterParams<AllnimalsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class AllnimalsService<ServiceParams extends Params = AllnimalsParams> extends MongoDBService<
  Allnimals,
  AllnimalsData,
  AllnimalsParams,
  AllnimalsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('allnimals'))
  }
}
