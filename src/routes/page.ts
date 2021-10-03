import Router from 'koa-router'

const router: MyRouter = new Router()

router.get('/', async (ctx) => {
  ctx.body = '<h1>Hello world</h1>'
})

router.get('/test', async (ctx) => {
  ctx.set('content-security-policy', '')
  ctx.set('content-security-policy-report-only', '')

  ctx.body = `
  <!-- <div data-mfe-html="https://www.douyin.com/video/6694143571185995022"></div> -->
  <div data-mfe-html="https://blog.fritx.me"></div>
  <div data-mfe-html="https://blog.fritx.me"></div>
  <div data-mfe-html="https://blog.fritx.me"></div>
  <script src="/micro-frontend.js"></script>
  `
})

export const pageRoutes = router.routes()
