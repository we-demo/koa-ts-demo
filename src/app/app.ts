require('../polyfill/sourcemap')
import { redis } from '../redis/redis'
import { routes } from './routes'
import { appSession } from './session'
import Koa = require('koa')
import KoaRatelimit = require('koa-ratelimit')
import koaHelmet = require('koa-helmet')

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const app = new Koa()

app.on('error', err => {
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
    id: ctx => ctx.ip,
    max: 20,
  })
)

app.use(koaHelmet())

appSession(app)

app.use(routes)

app.listen(port, () => {
  console.log('[koa] listening at port', port, host, process.env.NODE_ENV)
})
