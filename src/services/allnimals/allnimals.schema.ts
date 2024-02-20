// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AllnimalsService } from './allnimals.class'

// Main data model schema
export const allnimalsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Allnimals', additionalProperties: false }
)
export type Allnimals = Static<typeof allnimalsSchema>
export const allnimalsValidator = getValidator(allnimalsSchema, dataValidator)
export const allnimalsResolver = resolve<Allnimals, HookContext<AllnimalsService>>({})

export const allnimalsExternalResolver = resolve<Allnimals, HookContext<AllnimalsService>>({})

// Schema for creating new entries
export const allnimalsDataSchema = Type.Pick(allnimalsSchema, ['text'], {
  $id: 'AllnimalsData'
})
export type AllnimalsData = Static<typeof allnimalsDataSchema>
export const allnimalsDataValidator = getValidator(allnimalsDataSchema, dataValidator)
export const allnimalsDataResolver = resolve<Allnimals, HookContext<AllnimalsService>>({})

// Schema for updating existing entries
export const allnimalsPatchSchema = Type.Partial(allnimalsSchema, {
  $id: 'AllnimalsPatch'
})
export type AllnimalsPatch = Static<typeof allnimalsPatchSchema>
export const allnimalsPatchValidator = getValidator(allnimalsPatchSchema, dataValidator)
export const allnimalsPatchResolver = resolve<Allnimals, HookContext<AllnimalsService>>({})

// Schema for allowed query properties
export const allnimalsQueryProperties = Type.Pick(allnimalsSchema, ['_id', 'text'])
export const allnimalsQuerySchema = Type.Intersect(
  [
    querySyntax(allnimalsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AllnimalsQuery = Static<typeof allnimalsQuerySchema>
export const allnimalsQueryValidator = getValidator(allnimalsQuerySchema, queryValidator)
export const allnimalsQueryResolver = resolve<AllnimalsQuery, HookContext<AllnimalsService>>({})
