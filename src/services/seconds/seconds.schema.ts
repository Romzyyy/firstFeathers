// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { SecondsService } from './seconds.class'

// Main data model schema
export const secondsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Seconds', additionalProperties: false }
)
export type Seconds = Static<typeof secondsSchema>
export const secondsValidator = getValidator(secondsSchema, dataValidator)
export const secondsResolver = resolve<Seconds, HookContext<SecondsService>>({})

export const secondsExternalResolver = resolve<Seconds, HookContext<SecondsService>>({})

// Schema for creating new entries
export const secondsDataSchema = Type.Pick(secondsSchema, ['text'], {
  $id: 'SecondsData'
})
export type SecondsData = Static<typeof secondsDataSchema>
export const secondsDataValidator = getValidator(secondsDataSchema, dataValidator)
export const secondsDataResolver = resolve<Seconds, HookContext<SecondsService>>({})

// Schema for updating existing entries
export const secondsPatchSchema = Type.Partial(secondsSchema, {
  $id: 'SecondsPatch'
})
export type SecondsPatch = Static<typeof secondsPatchSchema>
export const secondsPatchValidator = getValidator(secondsPatchSchema, dataValidator)
export const secondsPatchResolver = resolve<Seconds, HookContext<SecondsService>>({})

// Schema for allowed query properties
export const secondsQueryProperties = Type.Pick(secondsSchema, ['_id', 'text'])
export const secondsQuerySchema = Type.Intersect(
  [
    querySyntax(secondsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type SecondsQuery = Static<typeof secondsQuerySchema>
export const secondsQueryValidator = getValidator(secondsQuerySchema, queryValidator)
export const secondsQueryResolver = resolve<SecondsQuery, HookContext<SecondsService>>({})
