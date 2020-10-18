import Router from 'koa-router'
import { apiRoutes } from './api'
import { pageRoutes } from './page'

const router: MyRouter = new Router()

router.use('/api', apiRoutes)
router.use(pageRoutes)

export const appRoutes = router.routes()
