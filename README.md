- [node-ts-demo](https://github.com/fritx/node-ts-demo)
- [koa-ts-demo](https://github.com/fritx/koa-ts-demo)
- [react-ts-demo](https://github.com/fritx/react-ts-demo)

### Changelog

- move `*.ts` to src/ and build to dist/
- tslint autofix => eslint prettier autofix

**[koa]**

- koa, koa-helmet, koa-ratelimit, ioredis, koa error
```sh
# Node version
# node >= 10

# Install dependencies
npm i

# Live build watch
npx tsc --watch

# Run demo
node dist/hello
```

```plain
- Dependencies
  - typescript 3.5.2
  - tslint 5.18.0

- npmrc
  - packafge-lock=false

- tsconfig
  - `compilerOptions.outDir='.'`
  - `include='**/*.ts'`

- VS-Code Extensions
  - TSLint (deprecated) 1.0.43
  - DotENV 1.0.1
```
