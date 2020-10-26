import { Server } from 'http'
import Koa from 'koa'
import request from 'supertest'
import { appSession } from '../app/session'
import { redis } from '../redis/redis'
import { apiRoutes } from './api'

let agent: request.SuperAgentTest
let server: Server

describe('api', () => {
  beforeAll(() => {
    const app = new Koa()
    appSession(app)
    app.use(apiRoutes)
    server = app.listen()
    // use `agent` to persist cookies
    // as needed for `ctx.session` testing
    agent = request.agent(server)
  })

  it('/session', async () => {
    const originalRandom = Math.random
    try {
      Math.random = jest.fn(() => 0.123456789)
      await agent.get('/session').expect(200).expect({ currRand: 0.123456789 })

      Math.random = jest.fn(() => 0.333)
      await agent
        .get('/session')
        .expect(200)
        .expect({ lastRand: 0.123456789, currRand: 0.333 })
    } finally {
      Math.random = originalRandom
    }
  })

  afterAll(() => {
    server.close()
    redis.disconnect()
  })
})
