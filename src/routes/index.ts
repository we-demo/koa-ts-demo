import Router from 'koa-router'
import { passport } from '../middlewares/passport'
import { apiRoutes } from './api'
import { pageRoutes } from './page'

const router: MyRouter = new Router()

const isApi = (ctx) => ctx.request.path.startsWith('/api')

router.use(async (ctx, next) => {
  console.log(`[request] method=${ctx.method} url=${ctx.url}`)
  try {
    await next()
  } catch (err) {
    const status = err.status || 500
    console.error(`[request error] status=${status}`, 'err=', err)
    ctx.status = status
    if (isApi(ctx)) {
      ctx.body = { status, error: String(err) }
    }
    // 在这里把请求的request层面的error都catch住，避免进入app.on('error')，与其区分开
  }
})

router.use(
  passport({
    redirectPath: process.env.PASSPORT_REDIRECT_PATH,
    fallbackPath: process.env.PASSPORT_FALLBACK_PATH,
    isApi,
    passportValidator: (ctx) => !!ctx.session.userId,
    passportFreePathList: ['/login', '/api/login'],
  })
)

router.use('/api', apiRoutes)
router.use(pageRoutes)

export const appRoutes = router.routes()
