import fs from 'fs'
import path from 'path'
import MarkdownIt from 'markdown-it'
import { highlight } from './highlight'
interface params{ path: string }
export const demoPlugin = (md: MarkdownIt, params: params) => {
  const RE = /<Demo /i
  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    if (RE.test(content.trim())) {
      const language = (content.match(/language=("|')(.*)('|")/) || [])[2] ?? ''
      const src = (content.match(/src=("|')(\S+)('|")/) || [])[2] ?? ''

      const _path = params && params.path ? params.path : '/src/components/'
      const absolutePath = path.join(process.cwd(), _path, src)

      if (!src || !fs.existsSync(absolutePath)) {
        const warningMsg = `${absolutePath} does not exist!`
        console.warn(`[markdown-it-demo]: ${warningMsg}`)
        return `<Demo src="${absolutePath}" >
        <p>${warningMsg}</p>`
      }

      const codeStr = fs.readFileSync(absolutePath).toString()
      const htmlStr = encodeURIComponent(highlight(codeStr, language || 'vue'))
      const pathArr = absolutePath.split('/')
      const componentName = pathArr[pathArr.length - 1].split('.vue')[0]
      return `<div class="demo-component"><${componentName}></${componentName}></div><div class="demo">${decodeURIComponent(htmlStr)}</div>`
    }
    else {
      return content
    }
  }
}
