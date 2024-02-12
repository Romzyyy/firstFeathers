// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  mahasiswaDataValidator,
  mahasiswaPatchValidator,
  mahasiswaQueryValidator,
  mahasiswaResolver,
  mahasiswaExternalResolver,
  mahasiswaDataResolver,
  mahasiswaPatchResolver,
  mahasiswaQueryResolver
} from './mahasiswa.schema'

import type { Application } from '../../declarations'
import { MahasiswaService, getOptions } from './mahasiswa.class'
import { mahasiswaPath, mahasiswaMethods } from './mahasiswa.shared'

export * from './mahasiswa.class'
export * from './mahasiswa.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const mahasiswa = (app: Application) => {
  // Register our service on the Feathers application
  app.use(mahasiswaPath, new MahasiswaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mahasiswaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mahasiswaPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(mahasiswaExternalResolver),
        schemaHooks.resolveResult(mahasiswaResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(mahasiswaQueryValidator),
        schemaHooks.resolveQuery(mahasiswaQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(mahasiswaDataValidator),
        schemaHooks.resolveData(mahasiswaDataResolver)
      ],
      patch: [
        schemaHooks.validateData(mahasiswaPatchValidator),
        schemaHooks.resolveData(mahasiswaPatchResolver)
      ],
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
    [mahasiswaPath]: MahasiswaService
  }
}
