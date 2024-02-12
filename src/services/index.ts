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
  app.configure(mahasiswa)
  app.configure(nilai)
  app.configure(test)
  app.configure(value)
  app.configure(todo)
  app.configure(message)
  app.configure(user)
  // All services will be registered here
}
