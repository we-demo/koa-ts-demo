import Router = require('koa-router')
import session = require('koa-session')

declare global {
  type MyRouter = Router<
    {},
    {
      session: session.Session | null
    }
  >

  interface Error {
    status?: number
  }
}
