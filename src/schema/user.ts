import { Schema } from 'dynamoose'
import { ImageInfoSchema } from '@/schema/image'

export const UserSchema = new Schema({
  userId: {
    type: String,
    hashKey: true
  },
  password: String,
  userName: String,
  completed: Boolean,
  auth: String,
  rules: {
    type: Array,
    schema: [String],
    required: true
  },
  profileImage: {
    type: Object,
    schema: ImageInfoSchema
  }
})
