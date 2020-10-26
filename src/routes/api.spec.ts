import { Server } from 'http'
import Koa from 'koa'
import request from 'supertest'
import { apiRoutes } from './api'

let server: Server

describe('api', () => {
  beforeAll(() => {
    const app = new Koa()
    app.use(apiRoutes)
    server = app.listen()
  })

  it('/error', async () => {
    const originalLog = console.error
    console.error = jest.fn()
    try {
      await request(server)
        .get('/error')
        .expect(500)
        .expect({ status: 500, error: 'Error: test' })
      expect(console.error).toBeCalledTimes(1)
    } finally {
      console.error = originalLog
    }
  })

  it('/get', () => {
    return request(server)
      .get('/get?a=1&b=foo')
      .expect(200)
      .expect({ query: { a: '1', b: 'foo' } })
  })

  it('/post', () => {
    return request(server)
      .post('/post?a=1&b=foo')
      .send({ foo: 123, bar: 'hey' })
      .expect(200)
      .expect({ query: { a: '1', b: 'foo' }, body: { foo: 123, bar: 'hey' } })
  })

  afterAll(() => {
    server.close()
  })
})
