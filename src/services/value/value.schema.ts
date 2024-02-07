// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ValueService } from './value.class'

// Main data model schema
export const valueSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Value', additionalProperties: false }
)
export type Value = Static<typeof valueSchema>
export const valueValidator = getValidator(valueSchema, dataValidator)
export const valueResolver = resolve<Value, HookContext<ValueService>>({})

export const valueExternalResolver = resolve<Value, HookContext<ValueService>>({})

// Schema for creating new entries
export const valueDataSchema = Type.Pick(valueSchema, ['text'], {
  $id: 'ValueData'
})
export type ValueData = Static<typeof valueDataSchema>
export const valueDataValidator = getValidator(valueDataSchema, dataValidator)
export const valueDataResolver = resolve<Value, HookContext<ValueService>>({})

// Schema for updating existing entries
export const valuePatchSchema = Type.Partial(valueSchema, {
  $id: 'ValuePatch'
})
export type ValuePatch = Static<typeof valuePatchSchema>
export const valuePatchValidator = getValidator(valuePatchSchema, dataValidator)
export const valuePatchResolver = resolve<Value, HookContext<ValueService>>({})

// Schema for allowed query properties
export const valueQueryProperties = Type.Pick(valueSchema, ['_id', 'text'])
export const valueQuerySchema = Type.Intersect(
  [
    querySyntax(valueQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ValueQuery = Static<typeof valueQuerySchema>
export const valueQueryValidator = getValidator(valueQuerySchema, queryValidator)
export const valueQueryResolver = resolve<ValueQuery, HookContext<ValueService>>({})
