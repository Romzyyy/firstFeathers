import { first } from './first/first'
import { allnimals } from './allnimals/allnimals'
import { nothing } from './nothing/nothing'
import { input } from './input/input'
import { nama } from './nama/nama'
import { coba } from './coba/coba'
import { student } from './student/student'
import { profile } from './profile/profile'
import { chat } from './chat/chat'
import { mahasiswa } from './mahasiswa/mahasiswa'
import { nilai } from './nilai/nilai'
import { test } from './test/test'
import { value } from './value/value'
import { todo } from './todos/todos'
import { message } from './message/message'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(first)
  app.configure(allnimals)
  app.configure(nothing)
  app.configure(input)
  app.configure(nama)
  app.configure(coba)
  app.configure(student)
  app.configure(profile)
  app.configure(chat)
  app.configure(mahasiswa)
  app.configure(nilai)
  app.configure(test)
  app.configure(value)
  app.configure(todo)
  app.configure(message)
  app.configure(user)
  // All services will be registered here
}
