// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Value, ValueData, ValuePatch, ValueQuery } from './value.schema'

export type { Value, ValueData, ValuePatch, ValueQuery }

export interface ValueParams extends MongoDBAdapterParams<ValueQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ValueService<ServiceParams extends Params = ValueParams> extends MongoDBService<
  Value,
  ValueData,
  ValueParams,
  ValuePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('value'))
  }
}
