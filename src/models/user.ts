import { Schema, model } from 'mongoose'

export interface IUser {
  email: string
  password: string
  nickname: string
  type: number // local, kakao, google, apple
  // 여러 oauth 들을 어떻게 다룰지 고민
}

const schema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String },
  nickname: { type: String, required: true },
  type: { type: Number, required: true },
})

export const User = model<IUser>('User', schema)
