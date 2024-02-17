// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TryService } from './try.class'

// Main data model schema
export const trySchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Try', additionalProperties: false }
)
export type Try = Static<typeof trySchema>
export const tryValidator = getValidator(trySchema, dataValidator)
export const tryResolver = resolve<Try, HookContext<TryService>>({})

export const tryExternalResolver = resolve<Try, HookContext<TryService>>({})

// Schema for creating new entries
export const tryDataSchema = Type.Pick(trySchema, ['text'], {
  $id: 'TryData'
})
export type TryData = Static<typeof tryDataSchema>
export const tryDataValidator = getValidator(tryDataSchema, dataValidator)
export const tryDataResolver = resolve<Try, HookContext<TryService>>({})

// Schema for updating existing entries
export const tryPatchSchema = Type.Partial(trySchema, {
  $id: 'TryPatch'
})
export type TryPatch = Static<typeof tryPatchSchema>
export const tryPatchValidator = getValidator(tryPatchSchema, dataValidator)
export const tryPatchResolver = resolve<Try, HookContext<TryService>>({})

// Schema for allowed query properties
export const tryQueryProperties = Type.Pick(trySchema, ['_id', 'text'])
export const tryQuerySchema = Type.Intersect(
  [
    querySyntax(tryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TryQuery = Static<typeof tryQuerySchema>
export const tryQueryValidator = getValidator(tryQuerySchema, queryValidator)
export const tryQueryResolver = resolve<TryQuery, HookContext<TryService>>({})
