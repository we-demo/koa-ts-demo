import './sourcemap-polyfill'
import { promises as fs } from 'fs'

type Hello = string

async function hello(str: Hello) {
  console.log(['hello', str])

  console.log(process.env.MY_VAR)

  let files = await fs.readdir('.')
  console.log(['files', files.length])

  console.trace('here')

  setInterval(() => {
    console.log('loop')
  }, 3000)

  throw new Error('boom')
}

hello('world')
