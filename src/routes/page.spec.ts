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

  it('/', () => {
    return request(server).get('/').expect(200).expect('<h1>Hello world</h1>')
  })
})
