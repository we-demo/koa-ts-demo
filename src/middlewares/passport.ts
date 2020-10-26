interface Options {
  redirectPath: string
  fallbackPath: string
  isApi: (ctx: MyContext) => boolean
  passportValidator: (ctx: MyContext) => boolean
  passportFreePathList: string[]
}

export const passport = (options: Options): MyMiddleware => {
  const {
    redirectPath,
    fallbackPath,
    isApi,
    passportValidator,
    passportFreePathList,
  } = options
  return async (ctx, next) => {
    const { request } = ctx
    const passportFree = passportFreePathList.includes(request.path)
    const valid = passportValidator(ctx)
    const isApiPath = isApi(ctx)

    if (valid) {
      // has passport, passport-free
      if (passportFree) {
        if (isApiPath) {
          ctx.throw(403)
        } else {
          ctx.redirect(redirectPath)
        }
        return
      }
      // has passport, require passport
      await next()
      return
    }

    // no passport, passport-free
    if (passportFree) {
      await next()
      return
    }
    // no passport, require passport
    if (isApiPath) {
      ctx.throw(403)
    } else {
      ctx.redirect(fallbackPath)
    }
  }
}
