// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ChatService } from './chat.class'

// Main data model schema
export const chatSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Chat', additionalProperties: false }
)
export type Chat = Static<typeof chatSchema>
export const chatValidator = getValidator(chatSchema, dataValidator)
export const chatResolver = resolve<Chat, HookContext<ChatService>>({})

export const chatExternalResolver = resolve<Chat, HookContext<ChatService>>({})

// Schema for creating new entries
export const chatDataSchema = Type.Pick(chatSchema, ['text'], {
  $id: 'ChatData'
})
export type ChatData = Static<typeof chatDataSchema>
export const chatDataValidator = getValidator(chatDataSchema, dataValidator)
export const chatDataResolver = resolve<Chat, HookContext<ChatService>>({})

// Schema for updating existing entries
export const chatPatchSchema = Type.Partial(chatSchema, {
  $id: 'ChatPatch'
})
export type ChatPatch = Static<typeof chatPatchSchema>
export const chatPatchValidator = getValidator(chatPatchSchema, dataValidator)
export const chatPatchResolver = resolve<Chat, HookContext<ChatService>>({})

// Schema for allowed query properties
export const chatQueryProperties = Type.Pick(chatSchema, ['_id', 'text'])
export const chatQuerySchema = Type.Intersect(
  [
    querySyntax(chatQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ChatQuery = Static<typeof chatQuerySchema>
export const chatQueryValidator = getValidator(chatQuerySchema, queryValidator)
export const chatQueryResolver = resolve<ChatQuery, HookContext<ChatService>>({})
