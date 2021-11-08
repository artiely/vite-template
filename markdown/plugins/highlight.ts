const chalk = require('chalk')
const prism = require('prismjs')
const loadLanguages = require('prismjs/components/index')
const escapeHtml = require('escape-html')

// required to make embedded highlighting work...
loadLanguages(['markup', 'css', 'javascript'])

function wrap(code: string, lang: string): string {
  console.log('lang', lang)
  if (lang === 'text')
    code = escapeHtml(code)

  return `<div class="language-${lang}" ><pre ><code>${code}</code></pre></div>`
}

export const highlight = (str: string, lang: string) => {
  if (!lang)
    return wrap(str, 'text')

  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html')
    lang = 'markup'

  if (lang === 'md')
    lang = 'markdown'

  if (lang === 'ts')
    lang = 'typescript'

  if (lang === 'py')
    lang = 'python'

  if (!prism.languages[lang]) {
    try {
      loadLanguages([lang])
    }
    catch (e) {
      console.warn(
        chalk.yellow(
          `[vitepress] Syntax highlight for language "${lang}" is not supported.`,
        ),
      )
    }
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    // console.log('高亮代码', wrap(code, rawLang))
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
