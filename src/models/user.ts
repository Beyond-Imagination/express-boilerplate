import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcrypt'

export enum AuthType {
  Local = 1,
  Kakao,
  Google,
  Apple,
}

export interface IUser {
  email: string
  password: string
  nickname: string
  type: AuthType // local, kakao, google, apple
  // 여러 oauth 들을 어떻게 다룰지 고민
}

interface IUserDocument extends IUser {
  checkPassword: (password: string) => boolean;
}

interface IUserModel extends Model<IUserDocument> {
  findByEmail: (email: string) => Promise<IUserDocument>;
}

const schema = new Schema<IUserDocument>({
  email: { type: String, required: true },
  password: { type: String },
  nickname: { type: String, required: true },
  type: { type: Number, required: true },
})

schema.pre('save', function(next) {    
    if(this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

schema.methods.checkPassword = function (password: string) : boolean {
  return bcrypt.compareSync(password, this.password);;
};

schema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
}

schema.statics.findByEmail = function (email: string) {
  return this.findOne({ email }).exec();
};

export const User = model<IUserDocument, IUserModel>('User', schema)
