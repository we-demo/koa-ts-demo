type Hello = string

function hello(str: Hello) {
  // tslint:disable-next-line no-console
  console.log(['hello', str])
}

hello('world')
