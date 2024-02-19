// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  nothingDataValidator,
  nothingPatchValidator,
  nothingQueryValidator,
  nothingResolver,
  nothingExternalResolver,
  nothingDataResolver,
  nothingPatchResolver,
  nothingQueryResolver
} from './nothing.schema'

import type { Application } from '../../declarations'
import { NothingService, getOptions } from './nothing.class'
import { nothingPath, nothingMethods } from './nothing.shared'

export * from './nothing.class'
export * from './nothing.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const nothing = (app: Application) => {
  // Register our service on the Feathers application
  app.use(nothingPath, new NothingService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: nothingMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(nothingPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(nothingExternalResolver),
        schemaHooks.resolveResult(nothingResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(nothingQueryValidator), schemaHooks.resolveQuery(nothingQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(nothingDataValidator), schemaHooks.resolveData(nothingDataResolver)],
      patch: [schemaHooks.validateData(nothingPatchValidator), schemaHooks.resolveData(nothingPatchResolver)],
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
    [nothingPath]: NothingService
  }
}
