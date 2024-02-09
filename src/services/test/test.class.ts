// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Test, TestData, TestPatch, TestQuery } from './test.schema'

export type { Test, TestData, TestPatch, TestQuery }

export interface TestParams extends MongoDBAdapterParams<TestQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TestService<ServiceParams extends Params = TestParams> extends MongoDBService<
  Test,
  TestData,
  TestParams,
  TestPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('test'))
  }
}
