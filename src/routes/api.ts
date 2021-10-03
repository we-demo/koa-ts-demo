import koaBody from 'koa-body'
import Router from 'koa-router'
import { sample } from 'lodash'

const router: MyRouter = new Router()

router.use(async (ctx, next) => {
  console.log(`[api request] method=${ctx.method} url=${ctx.url}`)
  try {
    await next()
  } catch (err) {
    const status = err.status || 500
    console.error(`[api error] status=${status}`, 'err=', err)
    ctx.status = status
    ctx.body = { status, error: String(err) }
  }
})

router.all('/error', async () => {
  throw new Error('test')
})

router.get('/session', koaBody(), async (ctx) => {
  const lastRand = ctx.session.rand
  const currRand = Math.random()
  ctx.session.rand = currRand
  ctx.body = { lastRand, currRand }
})

router.get('/get', async (ctx) => {
  ctx.body = {
    query: ctx.query,
  }
})

router.post('/post', koaBody(), async (ctx) => {
  ctx.body = {
    query: ctx.query,
    body: ctx.request.body,
  }
})

const colors = ['green', 'blue', 'red', 'orange', 'purple', 'yellow', 'gray']

router.post('/get_bootstrap_code', koaBody(), (ctx) => {
  const { htmlSrc } = ctx.request.body
  // TODO
  const id = 'app' + String(Math.random()).substr(2) // drop the dot
  const originalHtml = `
    <style>
    html { background-color: ${sample(colors)} }
    #btn { background-color: ${sample(colors)} }
    </style>
    <h1>App #1</h1><button id="btn"></button>
    <script>
      document.querySelector('#btn').addEventListener('click', () => {
        alert(${id})
      })
    </script>
  `
  ctx.body = {
    id,
    html: `
    <style>
    [data-mfe-id=${id}] { background-color: ${sample(colors)} }
    [data-mfe-id=${id}] #btn { background-color: ${sample(colors)} }
    </style>
    <h1>${id}</h1><button id="btn">Test</button>
    <script src="/test.js"></script>
    <script>
      ((window, document, location) => {
      document.title = 'title-${id}'
      console.log('document.title', document.title)
      console.log('btn', document.querySelector('#btn'))
      document.querySelector('#btn').addEventListener('click', () => {
        alert('${id}')
      })
      })(null, window['${id}'].document, null)
    </script>
    `,
  }
})

export const apiRoutes = router.routes()
