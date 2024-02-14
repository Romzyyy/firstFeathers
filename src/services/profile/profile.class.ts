// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Profile, ProfileData, ProfilePatch, ProfileQuery } from './profile.schema'

export type { Profile, ProfileData, ProfilePatch, ProfileQuery }

export interface ProfileParams extends MongoDBAdapterParams<ProfileQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ProfileService<ServiceParams extends Params = ProfileParams> extends MongoDBService<
  Profile,
  ProfileData,
  ProfileParams,
  ProfilePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('profile'))
  }
}
