import { model } from 'dynamoose'
import { DocumentModel } from '@/types/document-model'
import { UserSchema } from '@/schema/user'

export default model<DocumentModel.User>('byd.example.user', UserSchema)
