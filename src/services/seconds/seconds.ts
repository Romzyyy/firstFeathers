// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  secondsDataValidator,
  secondsPatchValidator,
  secondsQueryValidator,
  secondsResolver,
  secondsExternalResolver,
  secondsDataResolver,
  secondsPatchResolver,
  secondsQueryResolver
} from './seconds.schema'

import type { Application } from '../../declarations'
import { SecondsService, getOptions } from './seconds.class'
import { secondsPath, secondsMethods } from './seconds.shared'

export * from './seconds.class'
export * from './seconds.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const seconds = (app: Application) => {
  // Register our service on the Feathers application
  app.use(secondsPath, new SecondsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: secondsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(secondsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(secondsExternalResolver),
        schemaHooks.resolveResult(secondsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(secondsQueryValidator), schemaHooks.resolveQuery(secondsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(secondsDataValidator), schemaHooks.resolveData(secondsDataResolver)],
      patch: [schemaHooks.validateData(secondsPatchValidator), schemaHooks.resolveData(secondsPatchResolver)],
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
    [secondsPath]: SecondsService
  }
}
