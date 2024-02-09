// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { TestService } from './test.class'

// Main data model schema
export const testSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Test', additionalProperties: false }
)
export type Test = Static<typeof testSchema>
export const testValidator = getValidator(testSchema, dataValidator)
export const testResolver = resolve<Test, HookContext<TestService>>({})

export const testExternalResolver = resolve<Test, HookContext<TestService>>({})

// Schema for creating new entries
export const testDataSchema = Type.Pick(testSchema, ['text'], {
  $id: 'TestData'
})
export type TestData = Static<typeof testDataSchema>
export const testDataValidator = getValidator(testDataSchema, dataValidator)
export const testDataResolver = resolve<Test, HookContext<TestService>>({})

// Schema for updating existing entries
export const testPatchSchema = Type.Partial(testSchema, {
  $id: 'TestPatch'
})
export type TestPatch = Static<typeof testPatchSchema>
export const testPatchValidator = getValidator(testPatchSchema, dataValidator)
export const testPatchResolver = resolve<Test, HookContext<TestService>>({})

// Schema for allowed query properties
export const testQueryProperties = Type.Pick(testSchema, ['_id', 'text'])
export const testQuerySchema = Type.Intersect(
  [
    querySyntax(testQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TestQuery = Static<typeof testQuerySchema>
export const testQueryValidator = getValidator(testQuerySchema, queryValidator)
export const testQueryResolver = resolve<TestQuery, HookContext<TestService>>({})
