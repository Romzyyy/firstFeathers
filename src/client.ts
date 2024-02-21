// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { firstClient } from './services/first/first.shared'
export type { First, FirstData, FirstQuery, FirstPatch } from './services/first/first.shared'

import { allnimalsClient } from './services/allnimals/allnimals.shared'
export type {
  Allnimals,
  AllnimalsData,
  AllnimalsQuery,
  AllnimalsPatch
} from './services/allnimals/allnimals.shared'

import { nothingClient } from './services/nothing/nothing.shared'
export type { Nothing, NothingData, NothingQuery, NothingPatch } from './services/nothing/nothing.shared'

import { inputClient } from './services/input/input.shared'
export type { Input, InputData, InputQuery, InputPatch } from './services/input/input.shared'

import { namaClient } from './services/nama/nama.shared'
export type { Nama, NamaData, NamaQuery, NamaPatch } from './services/nama/nama.shared'

import { tryClient } from './services/try/try.shared'
export type { Try, TryData, TryQuery, TryPatch } from './services/try/try.shared'

import { cobaClient } from './services/coba/coba.shared'
export type { Coba, CobaData, CobaQuery, CobaPatch } from './services/coba/coba.shared'

import { studentClient } from './services/student/student.shared'
export type { Student, StudentData, StudentQuery, StudentPatch } from './services/student/student.shared'

import { profileClient } from './services/profile/profile.shared'
export type { Profile, ProfileData, ProfileQuery, ProfilePatch } from './services/profile/profile.shared'

import { chatClient } from './services/chat/chat.shared'
export type { Chat, ChatData, ChatQuery, ChatPatch } from './services/chat/chat.shared'

import { mahasiswaClient } from './services/mahasiswa/mahasiswa.shared'
export type {
  Mahasiswa,
  MahasiswaData,
  MahasiswaQuery,
  MahasiswaPatch
} from './services/mahasiswa/mahasiswa.shared'

import { nilaiClient } from './services/nilai/nilai.shared'
export type { Nilai, NilaiData, NilaiQuery, NilaiPatch } from './services/nilai/nilai.shared'

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
  client.configure(nilaiClient)
  client.configure(mahasiswaClient)
  client.configure(chatClient)
  client.configure(profileClient)
  client.configure(studentClient)
  client.configure(cobaClient)
  client.configure(tryClient)
  client.configure(namaClient)
  client.configure(inputClient)
  client.configure(nothingClient)
  client.configure(allnimalsClient)
  client.configure(firstClient)
  return client
}
