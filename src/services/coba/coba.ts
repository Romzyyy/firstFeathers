// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  cobaDataValidator,
  cobaPatchValidator,
  cobaQueryValidator,
  cobaResolver,
  cobaExternalResolver,
  cobaDataResolver,
  cobaPatchResolver,
  cobaQueryResolver
} from './coba.schema'

import type { Application } from '../../declarations'
import { CobaService, getOptions } from './coba.class'
import { cobaPath, cobaMethods } from './coba.shared'

export * from './coba.class'
export * from './coba.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const coba = (app: Application) => {
  // Register our service on the Feathers application
  app.use(cobaPath, new CobaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: cobaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(cobaPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(cobaExternalResolver),
        schemaHooks.resolveResult(cobaResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(cobaQueryValidator), schemaHooks.resolveQuery(cobaQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(cobaDataValidator), schemaHooks.resolveData(cobaDataResolver)],
      patch: [schemaHooks.validateData(cobaPatchValidator), schemaHooks.resolveData(cobaPatchResolver)],
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
    [cobaPath]: CobaService
  }
}
