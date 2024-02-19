// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { NothingService } from './nothing.class'

// Main data model schema
export const nothingSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Nothing', additionalProperties: false }
)
export type Nothing = Static<typeof nothingSchema>
export const nothingValidator = getValidator(nothingSchema, dataValidator)
export const nothingResolver = resolve<Nothing, HookContext<NothingService>>({})

export const nothingExternalResolver = resolve<Nothing, HookContext<NothingService>>({})

// Schema for creating new entries
export const nothingDataSchema = Type.Pick(nothingSchema, ['text'], {
  $id: 'NothingData'
})
export type NothingData = Static<typeof nothingDataSchema>
export const nothingDataValidator = getValidator(nothingDataSchema, dataValidator)
export const nothingDataResolver = resolve<Nothing, HookContext<NothingService>>({})

// Schema for updating existing entries
export const nothingPatchSchema = Type.Partial(nothingSchema, {
  $id: 'NothingPatch'
})
export type NothingPatch = Static<typeof nothingPatchSchema>
export const nothingPatchValidator = getValidator(nothingPatchSchema, dataValidator)
export const nothingPatchResolver = resolve<Nothing, HookContext<NothingService>>({})

// Schema for allowed query properties
export const nothingQueryProperties = Type.Pick(nothingSchema, ['_id', 'text'])
export const nothingQuerySchema = Type.Intersect(
  [
    querySyntax(nothingQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type NothingQuery = Static<typeof nothingQuerySchema>
export const nothingQueryValidator = getValidator(nothingQuerySchema, queryValidator)
export const nothingQueryResolver = resolve<NothingQuery, HookContext<NothingService>>({})
