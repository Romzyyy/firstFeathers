// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Todo, TodoData, TodoPatch, TodoQuery } from './todos.schema'

export type { Todo, TodoData, TodoPatch, TodoQuery }

export interface TodoParams extends MongoDBAdapterParams<TodoQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class TodoService<ServiceParams extends Params = TodoParams> extends MongoDBService<
  Todo,
  TodoData,
  TodoParams,
  TodoPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('todos'))
  }
}
