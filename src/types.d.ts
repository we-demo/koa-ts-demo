import session = require('koa-session')
import Router = require('koa-router')

declare global {
  type MyRouter = Router<
    Record<string, unknown>,
    {
      session: session.Session | null
    }
  >

  interface Error {
    status?: number
  }
}
