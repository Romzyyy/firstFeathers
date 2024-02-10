// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  nilaiDataValidator,
  nilaiPatchValidator,
  nilaiQueryValidator,
  nilaiResolver,
  nilaiExternalResolver,
  nilaiDataResolver,
  nilaiPatchResolver,
  nilaiQueryResolver
} from './nilai.schema'

import type { Application } from '../../declarations'
import { NilaiService, getOptions } from './nilai.class'
import { nilaiPath, nilaiMethods } from './nilai.shared'

export * from './nilai.class'
export * from './nilai.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const nilai = (app: Application) => {
  // Register our service on the Feathers application
  app.use(nilaiPath, new NilaiService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: nilaiMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(nilaiPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(nilaiExternalResolver),
        schemaHooks.resolveResult(nilaiResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(nilaiQueryValidator), schemaHooks.resolveQuery(nilaiQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(nilaiDataValidator), schemaHooks.resolveData(nilaiDataResolver)],
      patch: [schemaHooks.validateData(nilaiPatchValidator), schemaHooks.resolveData(nilaiPatchResolver)],
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
    [nilaiPath]: NilaiService
  }
}
