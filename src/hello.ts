import { promises as fs } from 'fs'

type Hello = string

async function hello(str: Hello) {
  // tslint:disable-next-line no-console
  console.log(['hello', str])

  let files = await fs.readdir('.')
  // tslint:disable-next-line no-console
  console.log(['files', files.length])
}

hello('world')
