import { Middleware } from 'koa'
import Router from 'koa-router'
import session from 'koa-session'

declare global {
  type MyStateT = Record<string, unknown>

  interface MyCustomT {
    session: session.Session | null
  }

  type MyContext = ParameterizedContext<StateT, CustomT>

  type MyRouter = Router<MyStateT, MyCustomT>

  type MyMiddleware = Middleware<MyStateT, MyCustomT>

  interface Error {
    status?: number
  }
}
