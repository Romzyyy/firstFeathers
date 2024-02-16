// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { CobaService } from './coba.class'

// Main data model schema
export const cobaSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Coba', additionalProperties: false }
)
export type Coba = Static<typeof cobaSchema>
export const cobaValidator = getValidator(cobaSchema, dataValidator)
export const cobaResolver = resolve<Coba, HookContext<CobaService>>({})

export const cobaExternalResolver = resolve<Coba, HookContext<CobaService>>({})

// Schema for creating new entries
export const cobaDataSchema = Type.Pick(cobaSchema, ['text'], {
  $id: 'CobaData'
})
export type CobaData = Static<typeof cobaDataSchema>
export const cobaDataValidator = getValidator(cobaDataSchema, dataValidator)
export const cobaDataResolver = resolve<Coba, HookContext<CobaService>>({})

// Schema for updating existing entries
export const cobaPatchSchema = Type.Partial(cobaSchema, {
  $id: 'CobaPatch'
})
export type CobaPatch = Static<typeof cobaPatchSchema>
export const cobaPatchValidator = getValidator(cobaPatchSchema, dataValidator)
export const cobaPatchResolver = resolve<Coba, HookContext<CobaService>>({})

// Schema for allowed query properties
export const cobaQueryProperties = Type.Pick(cobaSchema, ['_id', 'text'])
export const cobaQuerySchema = Type.Intersect(
  [
    querySyntax(cobaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type CobaQuery = Static<typeof cobaQuerySchema>
export const cobaQueryValidator = getValidator(cobaQuerySchema, queryValidator)
export const cobaQueryResolver = resolve<CobaQuery, HookContext<CobaService>>({})
