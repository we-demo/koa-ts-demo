import '../polyfill/sourcemap'
import Koa from 'koa'
import helmet from 'koa-helmet'
import ratelimit from 'koa-ratelimit'
import { redis } from '../redis/redis'
import { routes } from './routes'
import { appSession } from './session'

let port = process.env.PORT || 3000
let app = new Koa()

app.on('error', err => {
  // lintError(err)
  const status = err.status || 500
  // tslint:disable-next-line no-console
  console.error(`[koa error] status=${status}`, 'err=', err)
})

app.use(
  ratelimit({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db: redis as any, // fixme
    disableHeader: false,
    duration: 1000 * 10,
    errorMessage: 'Sometimes You Just Have to Slow Down.',
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total',
    },
    id: ctx => ctx.ip,
    max: 20,
  })
)

app.use(helmet())

appSession(app)

app.use(routes)

app.listen(port, () => {
  console.log('[koa] listening at port', port)
})
