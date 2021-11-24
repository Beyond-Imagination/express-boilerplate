import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

import {env} from '@/env'

const {dbURI} = env

export const mongooseLoader = async (): Promise<void> => {
  autoIncrement.initialize(mongoose.connection)
  await mongoose.connect(dbURI)

  console.info('mongodb loaded and connected')
}
