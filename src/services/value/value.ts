// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  valueDataValidator,
  valuePatchValidator,
  valueQueryValidator,
  valueResolver,
  valueExternalResolver,
  valueDataResolver,
  valuePatchResolver,
  valueQueryResolver
} from './value.schema'

import type { Application } from '../../declarations'
import { ValueService, getOptions } from './value.class'
import { valuePath, valueMethods } from './value.shared'

export * from './value.class'
export * from './value.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const value = (app: Application) => {
  // Register our service on the Feathers application
  app.use(valuePath, new ValueService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: valueMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(valuePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(valueExternalResolver),
        schemaHooks.resolveResult(valueResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(valueQueryValidator), schemaHooks.resolveQuery(valueQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(valueDataValidator), schemaHooks.resolveData(valueDataResolver)],
      patch: [schemaHooks.validateData(valuePatchValidator), schemaHooks.resolveData(valuePatchResolver)],
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
    [valuePath]: ValueService
  }
}
