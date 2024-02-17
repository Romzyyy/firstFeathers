// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  namaDataValidator,
  namaPatchValidator,
  namaQueryValidator,
  namaResolver,
  namaExternalResolver,
  namaDataResolver,
  namaPatchResolver,
  namaQueryResolver
} from './nama.schema'

import type { Application } from '../../declarations'
import { NamaService, getOptions } from './nama.class'
import { namaPath, namaMethods } from './nama.shared'

export * from './nama.class'
export * from './nama.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const nama = (app: Application) => {
  // Register our service on the Feathers application
  app.use(namaPath, new NamaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: namaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(namaPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(namaExternalResolver),
        schemaHooks.resolveResult(namaResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(namaQueryValidator), schemaHooks.resolveQuery(namaQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(namaDataValidator), schemaHooks.resolveData(namaDataResolver)],
      patch: [schemaHooks.validateData(namaPatchValidator), schemaHooks.resolveData(namaPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [namaPath]: NamaService
  }
}
