### Changelog

- move `*.ts` to src/ and build to dist/

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