// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TodoService } from './todos.class'

// Main data model schema
export const todoSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Todo', additionalProperties: false }
)
export type Todo = Static<typeof todoSchema>
export const todoValidator = getValidator(todoSchema, dataValidator)
export const todoResolver = resolve<Todo, HookContext<TodoService>>({})

export const todoExternalResolver = resolve<Todo, HookContext<TodoService>>({})

// Schema for creating new entries
export const todoDataSchema = Type.Pick(todoSchema, ['text'], {
  $id: 'TodoData'
})
export type TodoData = Static<typeof todoDataSchema>
export const todoDataValidator = getValidator(todoDataSchema, dataValidator)
export const todoDataResolver = resolve<Todo, HookContext<TodoService>>({})

// Schema for updating existing entries
export const todoPatchSchema = Type.Partial(todoSchema, {
  $id: 'TodoPatch'
})
export type TodoPatch = Static<typeof todoPatchSchema>
export const todoPatchValidator = getValidator(todoPatchSchema, dataValidator)
export const todoPatchResolver = resolve<Todo, HookContext<TodoService>>({})

// Schema for allowed query properties
export const todoQueryProperties = Type.Pick(todoSchema, ['_id', 'text'])
export const todoQuerySchema = Type.Intersect(
  [
    querySyntax(todoQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TodoQuery = Static<typeof todoQuerySchema>
export const todoQueryValidator = getValidator(todoQuerySchema, queryValidator)
export const todoQueryResolver = resolve<TodoQuery, HookContext<TodoService>>({})
