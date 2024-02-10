// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { nilaiClient } from './services/nilai/nilai.shared'
export type { Nilai, NilaiData, NilaiQuery, NilaiPatch } from './services/nilai/nilai.shared'

import { testClient } from './services/test/test.shared'
export type { Test, TestData, TestQuery, TestPatch } from './services/test/test.shared'

import { valueClient } from './services/value/value.shared'
export type { Value, ValueData, ValueQuery, ValuePatch } from './services/value/value.shared'

import { todoClient } from './services/todos/todos.shared'
export type { Todo, TodoData, TodoQuery, TodoPatch } from './services/todos/todos.shared'

import { messageClient } from './services/message/message.shared'
export type { Message, MessageData, MessageQuery, MessagePatch } from './services/message/message.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the firstfeathers app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(messageClient)
  client.configure(todoClient)
  client.configure(valueClient)
  client.configure(testClient)
  client.configure(nilaiClient)
  return client
}
