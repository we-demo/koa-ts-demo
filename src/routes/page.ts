import Router from 'koa-router'

const router: MyRouter = new Router()

router.get('/', async (ctx) => {
  ctx.body = '<h1>Hello world</h1>'
})

export const pageRoutes = router.routes()
