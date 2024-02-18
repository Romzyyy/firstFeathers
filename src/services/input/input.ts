// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  inputDataValidator,
  inputPatchValidator,
  inputQueryValidator,
  inputResolver,
  inputExternalResolver,
  inputDataResolver,
  inputPatchResolver,
  inputQueryResolver
} from './input.schema'

import type { Application } from '../../declarations'
import { InputService, getOptions } from './input.class'
import { inputPath, inputMethods } from './input.shared'

export * from './input.class'
export * from './input.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const input = (app: Application) => {
  // Register our service on the Feathers application
  app.use(inputPath, new InputService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: inputMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(inputPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(inputExternalResolver),
        schemaHooks.resolveResult(inputResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(inputQueryValidator), schemaHooks.resolveQuery(inputQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(inputDataValidator), schemaHooks.resolveData(inputDataResolver)],
      patch: [schemaHooks.validateData(inputPatchValidator), schemaHooks.resolveData(inputPatchResolver)],
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
    [inputPath]: InputService
  }
}
