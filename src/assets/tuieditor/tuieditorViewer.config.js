import Viewer from 'tui-editor/dist/tui-editor-View.js'

import 'tui-editor/dist/tui-editor-contents.css' // editor content
import 'highlight.js/styles/github.css' // code block highlight

export default function createViewer (dom, content) {
  return new Viewer({
    el: document.querySelector(dom),
    initialValue: content
  })
}
