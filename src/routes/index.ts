import Router from 'koa-router'
import { apiRoutes } from './api'
import { pageRoutes } from './page'

const router: MyRouter = new Router()

// if (process.env.NODE_ENV === 'development') {
//   console.log('/src/static', resolve(__dirname, '../../src/static'))
//   router.get(
//     '/src/static',
//     serve(resolve(__dirname, '../../src/static'), {
//       // root: resolve(__dirname, '../../src'),
//       root: resolve(__dirname, '../../..'),
//     })
//   )
// }

router.use('/api', apiRoutes)
router.use(pageRoutes)

export const appRoutes = router.routes()
