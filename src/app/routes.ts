import Router from 'koa-router'
import koaBody from 'koa-body'
import session from 'koa-session'

const router = new Router()
const apiRouter = new Router<
  {},
  {
    abc: number
    session: session.Session | null
  }
>()

apiRouter.use(async (ctx, next) => {
  console.log(`[api request] method=${ctx.method} url=${ctx.url}`)
  try {
    await next()
  } catch (err) {
    const status = err.status || 500
    console.error(`[api error] status=${status}`, 'err=', err)
    ctx.body = { status, error: String(err) }
  }
})

apiRouter.all('/error', async () => {
  throw new Error('test')
})

apiRouter.get('/session', koaBody(), async ctx => {
  const lastRand = ctx.session.rand
  const currRand = Math.random()
  ctx.session.rand = currRand
  ctx.body = { lastRand, currRand }
})

apiRouter.get('/get', async ctx => {
  ctx.body = {
    query: ctx.query,
  }
})

apiRouter.post('/post', koaBody(), async ctx => {
  ctx.body = {
    query: ctx.query,
    body: ctx.request.body,
  }
})

router.use('/api', apiRouter.routes())

router.get('/', async ctx => {
  ctx.body = '<h1>Hello world</h1>'
})

export const routes = router.routes()
