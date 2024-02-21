// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { FirstService } from './first.class'

// Main data model schema
export const firstSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'First', additionalProperties: false }
)
export type First = Static<typeof firstSchema>
export const firstValidator = getValidator(firstSchema, dataValidator)
export const firstResolver = resolve<First, HookContext<FirstService>>({})

export const firstExternalResolver = resolve<First, HookContext<FirstService>>({})

// Schema for creating new entries
export const firstDataSchema = Type.Pick(firstSchema, ['text'], {
  $id: 'FirstData'
})
export type FirstData = Static<typeof firstDataSchema>
export const firstDataValidator = getValidator(firstDataSchema, dataValidator)
export const firstDataResolver = resolve<First, HookContext<FirstService>>({})

// Schema for updating existing entries
export const firstPatchSchema = Type.Partial(firstSchema, {
  $id: 'FirstPatch'
})
export type FirstPatch = Static<typeof firstPatchSchema>
export const firstPatchValidator = getValidator(firstPatchSchema, dataValidator)
export const firstPatchResolver = resolve<First, HookContext<FirstService>>({})

// Schema for allowed query properties
export const firstQueryProperties = Type.Pick(firstSchema, ['_id', 'text'])
export const firstQuerySchema = Type.Intersect(
  [
    querySyntax(firstQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type FirstQuery = Static<typeof firstQuerySchema>
export const firstQueryValidator = getValidator(firstQuerySchema, queryValidator)
export const firstQueryResolver = resolve<FirstQuery, HookContext<FirstService>>({})
