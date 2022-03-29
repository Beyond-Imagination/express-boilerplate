import * as dotenv from 'dotenv'
import { resolve } from 'path';

import { getOsEnv, getOsEnvArray, toNumber } from '@/libs/env'

class Env {
  nodeEnv: string;
  isProduction: boolean;
  isTest: boolean;
  isDevelopment: boolean;
  
  // APPLICATION
  port: number;
  host: string;
  allowedOrigins: string[];
  
  // EXPRESS SESSION
  sessionKey: string;
  
  // JWT
  jwtSecret: string;

  // DB
  dbURI: string;

  // AWS
  aws: {
    profile: string;
    region: string;
    s3BucketName: string;
  };

  load() {
    this.nodeEnv = process.env.NODE_ENV || 'production',
    this.isProduction = process.env.NODE_ENV === 'production',
    this.isTest = process.env.NODE_ENV === 'test',
    this.isDevelopment = process.env.NODE_ENV === 'development',
  
    this.port = toNumber(getOsEnv('APP_PORT', '3005')),
    this.host = getOsEnv('APP_HOST', 'localhost'),
    this.allowedOrigins = getOsEnvArray('ALLOWED_ORIGINS'),
  
    this.sessionKey = getOsEnv('SESSION_KEY'),
  
    this.jwtSecret = getOsEnv('JWT_SECRET'),
  
    this.dbURI = getOsEnv('DB_URI'),
  
    this.aws = {
      profile: getOsEnv('AWS_PROFILE'),
      region: getOsEnv('AWS_REGION', 'ap-northeast-2'),
      s3BucketName: getOsEnv('AWS_S3_BUCKET_NAME'),
    }
  }
}

export let env = new Env();

(() => {
  if (process.env.NODE_ENV === "test") {
    return
  }

  const envPath = resolve(`${__dirname}/../env`)
  // development, production, test 환경 변수를 따로 관리할 경우 path를 세분화 하면 됩니다.
  const path = resolve(`${envPath}/.env`)

  const envFound = dotenv.config({ path })

  if (envFound.error) {
    console.error("couldn't find .env file")
  }
  env.load();
})()
