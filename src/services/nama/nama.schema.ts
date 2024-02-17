// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { NamaService } from './nama.class'

// Main data model schema
export const namaSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Nama', additionalProperties: false }
)
export type Nama = Static<typeof namaSchema>
export const namaValidator = getValidator(namaSchema, dataValidator)
export const namaResolver = resolve<Nama, HookContext<NamaService>>({})

export const namaExternalResolver = resolve<Nama, HookContext<NamaService>>({})

// Schema for creating new entries
export const namaDataSchema = Type.Pick(namaSchema, ['text'], {
  $id: 'NamaData'
})
export type NamaData = Static<typeof namaDataSchema>
export const namaDataValidator = getValidator(namaDataSchema, dataValidator)
export const namaDataResolver = resolve<Nama, HookContext<NamaService>>({})

// Schema for updating existing entries
export const namaPatchSchema = Type.Partial(namaSchema, {
  $id: 'NamaPatch'
})
export type NamaPatch = Static<typeof namaPatchSchema>
export const namaPatchValidator = getValidator(namaPatchSchema, dataValidator)
export const namaPatchResolver = resolve<Nama, HookContext<NamaService>>({})

// Schema for allowed query properties
export const namaQueryProperties = Type.Pick(namaSchema, ['_id', 'text'])
export const namaQuerySchema = Type.Intersect(
  [
    querySyntax(namaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type NamaQuery = Static<typeof namaQuerySchema>
export const namaQueryValidator = getValidator(namaQuerySchema, queryValidator)
export const namaQueryResolver = resolve<NamaQuery, HookContext<NamaService>>({})
