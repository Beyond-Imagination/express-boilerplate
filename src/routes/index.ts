import articles from '@/routes/modules/articles'
import auth from '@/routes/modules/auth'

import { Server } from '@/types/server'

const routes: Server.IRoute[] = [
  articles,
  auth
]

export default routes
