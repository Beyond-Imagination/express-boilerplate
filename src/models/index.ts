import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

import { env } from '@/env'

export const loadMongoose = async (): Promise<void> => {
  autoIncrement.initialize(mongoose.connection)
  await mongoose.connect(env.dbURI)

  console.info('mongodb loaded and connected')
}

export * from './user'
