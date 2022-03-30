import auth from '@/routes/auth'
import dev from '@/routes/dev'

const routes = [
  auth
]

if(process.env.NODE_ENV !== 'production'){
  console.log('개발자모드')
  routes.push(dev)  
}

export default routes
