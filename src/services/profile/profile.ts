// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  profileDataValidator,
  profilePatchValidator,
  profileQueryValidator,
  profileResolver,
  profileExternalResolver,
  profileDataResolver,
  profilePatchResolver,
  profileQueryResolver
} from './profile.schema'

import type { Application } from '../../declarations'
import { ProfileService, getOptions } from './profile.class'
import { profilePath, profileMethods } from './profile.shared'

export * from './profile.class'
export * from './profile.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const profile = (app: Application) => {
  // Register our service on the Feathers application
  app.use(profilePath, new ProfileService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: profileMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(profilePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(profileExternalResolver),
        schemaHooks.resolveResult(profileResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(profileQueryValidator), schemaHooks.resolveQuery(profileQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(profileDataValidator), schemaHooks.resolveData(profileDataResolver)],
      patch: [schemaHooks.validateData(profilePatchValidator), schemaHooks.resolveData(profilePatchResolver)],
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
    [profilePath]: ProfileService
  }
}
