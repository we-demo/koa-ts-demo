import Router from 'koa-router'

const { PASSPORT_REDIRECT_PATH, PASSPORT_FALLBACK_PATH } = process.env

const router: MyRouter = new Router()

router.get('/login', async (ctx) => {
  ctx.body = `
    <h1>Please Login</h1>
    <div><button id="btn_login">Login</button></div>
    <script>
      btn_login.addEventListener('click', async () => {
        try {
          await fetch('/api/login', {
            method: 'POST',
          })
          location.href = ${JSON.stringify(PASSPORT_REDIRECT_PATH)}
        } catch (err) {
          alert(String(err))
        }
      })
    </script>
  `
})

router.get('/', async (ctx) => {
  ctx.body = `
    <h1>Welcome Home</h1>
    <div><button id="btn_logout">Logout</button></div>
    <script>
      btn_logout.addEventListener('click', async () => {
        try {
          await fetch('/api/logout', {
            method: 'POST',
          })
          location.href = ${JSON.stringify(PASSPORT_FALLBACK_PATH)}
        } catch (err) {
          alert(String(err))
        }
      })
    </script>
  `
})

export const pageRoutes = router.routes()
