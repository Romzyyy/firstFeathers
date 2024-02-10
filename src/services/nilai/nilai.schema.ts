// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { NilaiService } from './nilai.class'

// Main data model schema
export const nilaiSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Nilai', additionalProperties: false }
)
export type Nilai = Static<typeof nilaiSchema>
export const nilaiValidator = getValidator(nilaiSchema, dataValidator)
export const nilaiResolver = resolve<Nilai, HookContext<NilaiService>>({})

export const nilaiExternalResolver = resolve<Nilai, HookContext<NilaiService>>({})

// Schema for creating new entries
export const nilaiDataSchema = Type.Pick(nilaiSchema, ['text'], {
  $id: 'NilaiData'
})
export type NilaiData = Static<typeof nilaiDataSchema>
export const nilaiDataValidator = getValidator(nilaiDataSchema, dataValidator)
export const nilaiDataResolver = resolve<Nilai, HookContext<NilaiService>>({})

// Schema for updating existing entries
export const nilaiPatchSchema = Type.Partial(nilaiSchema, {
  $id: 'NilaiPatch'
})
export type NilaiPatch = Static<typeof nilaiPatchSchema>
export const nilaiPatchValidator = getValidator(nilaiPatchSchema, dataValidator)
export const nilaiPatchResolver = resolve<Nilai, HookContext<NilaiService>>({})

// Schema for allowed query properties
export const nilaiQueryProperties = Type.Pick(nilaiSchema, ['_id', 'text'])
export const nilaiQuerySchema = Type.Intersect(
  [
    querySyntax(nilaiQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type NilaiQuery = Static<typeof nilaiQuerySchema>
export const nilaiQueryValidator = getValidator(nilaiQuerySchema, queryValidator)
export const nilaiQueryResolver = resolve<NilaiQuery, HookContext<NilaiService>>({})
