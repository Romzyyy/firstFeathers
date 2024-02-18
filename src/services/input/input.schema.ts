// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { InputService } from './input.class'

// Main data model schema
export const inputSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Input', additionalProperties: false }
)
export type Input = Static<typeof inputSchema>
export const inputValidator = getValidator(inputSchema, dataValidator)
export const inputResolver = resolve<Input, HookContext<InputService>>({})

export const inputExternalResolver = resolve<Input, HookContext<InputService>>({})

// Schema for creating new entries
export const inputDataSchema = Type.Pick(inputSchema, ['text'], {
  $id: 'InputData'
})
export type InputData = Static<typeof inputDataSchema>
export const inputDataValidator = getValidator(inputDataSchema, dataValidator)
export const inputDataResolver = resolve<Input, HookContext<InputService>>({})

// Schema for updating existing entries
export const inputPatchSchema = Type.Partial(inputSchema, {
  $id: 'InputPatch'
})
export type InputPatch = Static<typeof inputPatchSchema>
export const inputPatchValidator = getValidator(inputPatchSchema, dataValidator)
export const inputPatchResolver = resolve<Input, HookContext<InputService>>({})

// Schema for allowed query properties
export const inputQueryProperties = Type.Pick(inputSchema, ['_id', 'text'])
export const inputQuerySchema = Type.Intersect(
  [
    querySyntax(inputQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type InputQuery = Static<typeof inputQuerySchema>
export const inputQueryValidator = getValidator(inputQuerySchema, queryValidator)
export const inputQueryResolver = resolve<InputQuery, HookContext<InputService>>({})
