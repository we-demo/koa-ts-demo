require('../polyfill/sourcemap')
import Koa from 'koa'
import koaHelmet from 'koa-helmet'
import KoaRatelimit from 'koa-ratelimit'
import serve from 'koa-static'
import { resolve } from 'path'
import { redis } from '../redis/redis'
import { appRoutes } from '../routes'
import { appSession } from './session'

const staticDir = resolve(__dirname, '../../static')

export const app = new Koa()

app.on('error', (err) => {
  // lintError(err)
  const status = err.status || 500
  // tslint:disable-next-line no-console
  console.error(`[koa error] status=${status}`, 'err=', err)
})

app.use(
  KoaRatelimit({
    driver: 'redis',
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
    id: (ctx) => ctx.ip,
    max: 20,
  })
)

app.use(
  koaHelmet({
    contentSecurityPolicy: false,
  })
)

appSession(app)

app.use(appRoutes)

app.use(serve(staticDir))
