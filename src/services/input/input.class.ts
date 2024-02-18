// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Input, InputData, InputPatch, InputQuery } from './input.schema'

export type { Input, InputData, InputPatch, InputQuery }

export interface InputParams extends MongoDBAdapterParams<InputQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class InputService<ServiceParams extends Params = InputParams> extends MongoDBService<
  Input,
  InputData,
  InputParams,
  InputPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('input'))
  }
}
