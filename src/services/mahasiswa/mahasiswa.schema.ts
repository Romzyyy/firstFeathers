// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { MahasiswaService } from './mahasiswa.class'

// Main data model schema
export const mahasiswaSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Mahasiswa', additionalProperties: false }
)
export type Mahasiswa = Static<typeof mahasiswaSchema>
export const mahasiswaValidator = getValidator(mahasiswaSchema, dataValidator)
export const mahasiswaResolver = resolve<Mahasiswa, HookContext<MahasiswaService>>({})

export const mahasiswaExternalResolver = resolve<Mahasiswa, HookContext<MahasiswaService>>({})

// Schema for creating new entries
export const mahasiswaDataSchema = Type.Pick(mahasiswaSchema, ['text'], {
  $id: 'MahasiswaData'
})
export type MahasiswaData = Static<typeof mahasiswaDataSchema>
export const mahasiswaDataValidator = getValidator(mahasiswaDataSchema, dataValidator)
export const mahasiswaDataResolver = resolve<Mahasiswa, HookContext<MahasiswaService>>({})

// Schema for updating existing entries
export const mahasiswaPatchSchema = Type.Partial(mahasiswaSchema, {
  $id: 'MahasiswaPatch'
})
export type MahasiswaPatch = Static<typeof mahasiswaPatchSchema>
export const mahasiswaPatchValidator = getValidator(mahasiswaPatchSchema, dataValidator)
export const mahasiswaPatchResolver = resolve<Mahasiswa, HookContext<MahasiswaService>>({})

// Schema for allowed query properties
export const mahasiswaQueryProperties = Type.Pick(mahasiswaSchema, ['_id', 'text'])
export const mahasiswaQuerySchema = Type.Intersect(
  [
    querySyntax(mahasiswaQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MahasiswaQuery = Static<typeof mahasiswaQuerySchema>
export const mahasiswaQueryValidator = getValidator(mahasiswaQuerySchema, queryValidator)
export const mahasiswaQueryResolver = resolve<MahasiswaQuery, HookContext<MahasiswaService>>({})
