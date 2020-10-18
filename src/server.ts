import { app } from './app/app'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV

export const server = app.listen(port, () => {
  console.log(`[koa] started env=${env} http://${host}:${port}`)
})
