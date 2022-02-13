import 'module-alias/register'
import '@/loaders/env' // 이 파일 내에서 환경 변수를 사용하는 곳보다 상단에 위치해야 합니다.

import { load } from '@/loader'
import {awsLoader, expressLoader, mongooseLoader} from '@/loaders'
import {env} from '@/env'

const { port, host } = env;

(async () => {
  try {
    await load()
    await mongooseLoader()
    awsLoader()
    const app = expressLoader()
    
    app.listen(port, () => console.log(`Application running on ${host}:${port}`))
  } catch (error) {
    console.error('Application is crashed\n' + error)
  }
})()
