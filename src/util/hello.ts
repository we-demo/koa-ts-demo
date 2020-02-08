import { promises as fs } from 'fs'
import '../polyfill/sourcemap'
import { redis } from '../redis/redis'

type Hello = string

async function hello(str: Hello) {
  console.log(['hello', str])

  console.log(process.env.MY_VAR)

  const files = await fs.readdir('.')
  console.log(['files', files.length])

  console.trace('here')

  const prefixRedis = process.env.PREFIX_NODE_APP_REDIS
  const keyVisit = `${prefixRedis}visit`

  setInterval(async () => {
    const count = +(await redis.get(keyVisit)) || 0
    console.log(['visit', count])
    await redis.set(keyVisit, count + 1)
  }, 3000)

  throw new Error('boom')
}

hello('world')
