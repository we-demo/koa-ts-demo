// disallow to import any node_modules
// import { isString } from 'lodash'

// wrap as closure
{
  const apps = document.querySelectorAll('[data-mfe-html]')

  // run in parallel
  apps.forEach(async (el) => {
    const htmlSrc = el.getAttribute('data-mfe-html')
    let res = await fetch('/api/get_bootstrap_code', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ htmlSrc }),
    })
    res = await res.json()
    const { id, html } = res as any
    initMicroFrontend(el, id, html)
  })

  function initMicroFrontend(el: Element, id: string, html: string) {
    const fakedDocumentKeys = ['title']
    const fakedkDocument = new Proxy(document, {
      get(target, key) {
        if (isString(key)) {
          if (fakedDocumentKeys.includes(key)) {
            return this[key]
          }
          if (['querySelector', 'querySelectorAll'].includes(key)) {
            const boundKey = `bound__${key}`
            if (!el[boundKey]) {
              el[boundKey] = el[key].bind(el)
            }
            return el[boundKey]
          }
        }
        return target[key]
      },
      set(target, key, value) {
        if (isString(key)) {
          if (fakedDocumentKeys.includes(key)) {
            return (this[key] = value)
          }
        }
        return (target[key] = value)
      },
    })

    ;(window as any)[id] = {
      document: fakedkDocument,
    }

    el.setAttribute('data-mfe-id', id)
    el.innerHTML = html

    el.querySelectorAll('script').forEach((script) => {
      const newScript = document.createElement('script')
      if (script.getAttribute('src')) {
        newScript.setAttribute('src', script.getAttribute('src'))
      } else {
        newScript.textContent = script.textContent
      }
      script.parentElement.insertBefore(newScript, script)
      script.parentElement.removeChild(script)
      // if (script.getAttribute('src')) {
      //   const newScript = document.createElement('script')
      //   newScript.setAttribute('src', script.getAttribute('src'))
      //   script.parentElement.insertBefore(newScript, script)
      //   script.parentElement.removeChild(script)
      // } else {
      //   new Function(script.textContent)()
      // }
    })
  }

  function isString(value): value is string {
    return typeof value === 'string'
  }
}
