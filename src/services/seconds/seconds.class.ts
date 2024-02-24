// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Seconds, SecondsData, SecondsPatch, SecondsQuery } from './seconds.schema'

export type { Seconds, SecondsData, SecondsPatch, SecondsQuery }

export interface SecondsParams extends MongoDBAdapterParams<SecondsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class SecondsService<ServiceParams extends Params = SecondsParams> extends MongoDBService<
  Seconds,
  SecondsData,
  SecondsParams,
  SecondsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('seconds'))
  }
}
