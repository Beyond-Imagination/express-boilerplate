import {getOsEnv, getOsEnvArray, toNumber} from '@/libs/env'

export const env = {
  nodeEnv: process.env.NODE_ENV || 'production',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',

  // APPLICATION
  port: toNumber(getOsEnv('APP_PORT', '3005')),
  host: getOsEnv('APP_HOST', 'localhost'),
  appDir: getOsEnv('APP_DIR', 'express-boilerplate'),
  allowedOrigins: getOsEnvArray('ALLOWED_ORIGINS'),

  // EXPRESS SESSION
  sessionKey: getOsEnv('SESSION_KEY'),

  // JWT
  jwtSecret: getOsEnv('JWT_SECRET'),

  // DB
  dbURI: getOsEnv('DB_URI'),

  // AWS
  aws: {
    profile: getOsEnv('AWS_PROFILE'),
    region: getOsEnv('AWS_REGION', 'ap-northeast-2'),
    s3BucketName: getOsEnv('AWS_S3_BUCKET_NAME'),
  },
}