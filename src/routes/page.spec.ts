import { Server } from 'http'
import Koa from 'koa'
import request from 'supertest'
import { pageRoutes } from './page'

let server: Server

describe('page', () => {
  beforeAll(() => {
    const app = new Koa()
    app.use(pageRoutes)
    server = app.listen()
  })

  it('/login', () => {
    return request(server)
      .get('/login')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Please Login')
      })
  })

  it('/', () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Welcome Home')
      })
  })

  afterAll(() => {
    server.close()
  })
})
