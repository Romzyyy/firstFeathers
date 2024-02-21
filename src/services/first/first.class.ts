// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { First, FirstData, FirstPatch, FirstQuery } from './first.schema'

export type { First, FirstData, FirstPatch, FirstQuery }

export interface FirstParams extends MongoDBAdapterParams<FirstQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class FirstService<ServiceParams extends Params = FirstParams> extends MongoDBService<
  First,
  FirstData,
  FirstParams,
  FirstPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('first'))
  }
}
