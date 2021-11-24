import * as dotenv from 'dotenv'
import {resolve} from 'path';

(() => {
  const envPath = resolve(`${__dirname}/../../env`)
  // development, production, test 환경 변수를 따로 관리할 경우 path를 세분화 하면 됩니다.
  const path = resolve(`${envPath}/.env`)

  const envFound = dotenv.config({ path })

  if (envFound.error) {
    throw new Error('couldn\'t find .env file️')
  }
})()