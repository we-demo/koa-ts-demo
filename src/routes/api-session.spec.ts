import Koa from 'koa'
import request from 'supertest'
import { appSession } from '../app/session'
import { apiRoutes } from './api'

let agent: request.SuperAgentTest

describe('api', () => {
  beforeAll(() => {
    const app = new Koa()
    appSession(app)
    app.use(apiRoutes)
    const server = app.listen()
    // use `agent` to persist cookies
    // as needed for `ctx.session` testing
    agent = request.agent(server)
  })

  it('/session', async () => {
    Math.random = jest.fn(() => 0.123456789)
    await agent.get('/session').expect(200).expect({ currRand: 0.123456789 })

    Math.random = jest.fn(() => 0.333)
    await agent
      .get('/session')
      .expect(200)
      .expect({ lastRand: 0.123456789, currRand: 0.333 })
  })
})
