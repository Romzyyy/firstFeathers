// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'
    
import {
  tryDataValidator,
  tryPatchValidator,
  tryQueryValidator,
  tryResolver,
  tryExternalResolver,
  tryDataResolver,
  tryPatchResolver,
  tryQueryResolver
} from './try.schema'


import type { Application } from '../../declarations'
import { TryService, getOptions } from './try.class'
import { tryPath, tryMethods } from './try.shared'

export * from './try.class'
export * from './try.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const try = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tryPath, new TryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tryPath).hooks({
    around: {
      all: [
        authenticate('jwt'), 
        schemaHooks.resolveExternal(tryExternalResolver),
        schemaHooks.resolveResult(tryResolver),
      ],
    },
    before: {
      all: [
        schemaHooks.validateQuery(tryQueryValidator),
        schemaHooks.resolveQuery(tryQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(tryDataValidator),
        schemaHooks.resolveData(tryDataResolver)
      ],
      patch: [
        schemaHooks.validateData(tryPatchValidator),
        schemaHooks.resolveData(tryPatchResolver)
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
    [tryPath]: TryService
  }
}
