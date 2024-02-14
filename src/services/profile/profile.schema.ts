// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ProfileService } from './profile.class'

// Main data model schema
export const profileSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Profile', additionalProperties: false }
)
export type Profile = Static<typeof profileSchema>
export const profileValidator = getValidator(profileSchema, dataValidator)
export const profileResolver = resolve<Profile, HookContext<ProfileService>>({})

export const profileExternalResolver = resolve<Profile, HookContext<ProfileService>>({})

// Schema for creating new entries
export const profileDataSchema = Type.Pick(profileSchema, ['text'], {
  $id: 'ProfileData'
})
export type ProfileData = Static<typeof profileDataSchema>
export const profileDataValidator = getValidator(profileDataSchema, dataValidator)
export const profileDataResolver = resolve<Profile, HookContext<ProfileService>>({})

// Schema for updating existing entries
export const profilePatchSchema = Type.Partial(profileSchema, {
  $id: 'ProfilePatch'
})
export type ProfilePatch = Static<typeof profilePatchSchema>
export const profilePatchValidator = getValidator(profilePatchSchema, dataValidator)
export const profilePatchResolver = resolve<Profile, HookContext<ProfileService>>({})

// Schema for allowed query properties
export const profileQueryProperties = Type.Pick(profileSchema, ['_id', 'text'])
export const profileQuerySchema = Type.Intersect(
  [
    querySyntax(profileQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ProfileQuery = Static<typeof profileQuerySchema>
export const profileQueryValidator = getValidator(profileQuerySchema, queryValidator)
export const profileQueryResolver = resolve<ProfileQuery, HookContext<ProfileService>>({})
