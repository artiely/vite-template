// markdown-it plugin for generating line numbers.
// It depends on preWrapper plugin.

import MarkdownIt from 'markdown-it'

export const lineNumberPlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (...args) => {
    const rawCode = fence(...args)
    // const _code = rawCode.slice(
    //   rawCode.indexOf('<code>'),
    //   rawCode.indexOf('</code>'),
    // )

    const _code = /<code .*?>(.*?)<\/code>/gis

    const newCode = String(rawCode).match(_code) || ['']
    // console.log('🚀 ~ file: lineNumbers.ts ~ line 18 ~ lineNumberPlugin ~ newCode', newCode)

    const lines = newCode[0].split('\n')
    const lineNumbersCode = [...Array(lines.length - 1)]
      .map((line, index) => `<span class="line-number">${index + 1}</span><br>`)
      .join('')

    const lineNumbersWrapperCode = `<div class="line-numbers-wrapper">${lineNumbersCode}</div>`

    const finalCode = rawCode
      .replace(/<\/div>$/, `${lineNumbersWrapperCode}</div>`)
      .replace(/"(language-\w+)"/, '"$1 line-numbers-mode"')

    return finalCode
  }
}
