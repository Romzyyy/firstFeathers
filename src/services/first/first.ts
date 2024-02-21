// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  firstDataValidator,
  firstPatchValidator,
  firstQueryValidator,
  firstResolver,
  firstExternalResolver,
  firstDataResolver,
  firstPatchResolver,
  firstQueryResolver
} from './first.schema'

import type { Application } from '../../declarations'
import { FirstService, getOptions } from './first.class'
import { firstPath, firstMethods } from './first.shared'

export * from './first.class'
export * from './first.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const first = (app: Application) => {
  // Register our service on the Feathers application
  app.use(firstPath, new FirstService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: firstMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(firstPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(firstExternalResolver),
        schemaHooks.resolveResult(firstResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(firstQueryValidator), schemaHooks.resolveQuery(firstQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(firstDataValidator), schemaHooks.resolveData(firstDataResolver)],
      patch: [schemaHooks.validateData(firstPatchValidator), schemaHooks.resolveData(firstPatchResolver)],
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
    [firstPath]: FirstService
  }
}
