// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  allnimalsDataValidator,
  allnimalsPatchValidator,
  allnimalsQueryValidator,
  allnimalsResolver,
  allnimalsExternalResolver,
  allnimalsDataResolver,
  allnimalsPatchResolver,
  allnimalsQueryResolver
} from './allnimals.schema'

import type { Application } from '../../declarations'
import { AllnimalsService, getOptions } from './allnimals.class'
import { allnimalsPath, allnimalsMethods } from './allnimals.shared'

export * from './allnimals.class'
export * from './allnimals.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const allnimals = (app: Application) => {
  // Register our service on the Feathers application
  app.use(allnimalsPath, new AllnimalsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: allnimalsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(allnimalsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(allnimalsExternalResolver),
        schemaHooks.resolveResult(allnimalsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(allnimalsQueryValidator),
        schemaHooks.resolveQuery(allnimalsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(allnimalsDataValidator),
        schemaHooks.resolveData(allnimalsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(allnimalsPatchValidator),
        schemaHooks.resolveData(allnimalsPatchResolver)
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
    [allnimalsPath]: AllnimalsService
  }
}
