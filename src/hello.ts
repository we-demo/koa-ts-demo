import { promises as fs } from 'fs'

type Hello = string

async function hello(str: Hello) {
  console.log(['hello', str])

  let files = await fs.readdir('.')
  console.log(['files', files.length])
}

hello('world')
