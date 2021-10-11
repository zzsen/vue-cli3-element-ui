import Editor from 'tui-editor/dist/tui-editor-Editor-all'
import axios from 'axios'

import 'tui-editor/dist/tui-editor.css' // editor ui
import 'tui-editor/dist/tui-editor-contents.css' // editor content
import 'highlight.js/styles/github.css' // code block highlight
import 'tui-color-picker/dist/tui-color-picker.css'
import './tuieditor.scss'

const imageUpload = (blob) => {
  const formData = new FormData()
  formData.append('upfile', blob, `blob${blob.type.split('/')[1]}`)
  formData.append('type', 'ajax')
  return axios.post('/handle/tui-editor.ashx?action=uploadimage', formData)
    .then(res => {
      // 会默认进入error的回调
        return console.log(res)
    })
    .catch(err => {
      if (err.data.state === 'SUCCESS') {
        return err.data.url
      } else {
        return console.log('图片上传失败')
      }
    })
}

export default function createEditor (dom, attr = {}) {
  return new Editor(Object.assign({
    el: document.querySelector(dom),
    initialEditType: 'wysiwyg',
    previewStyle: 'vertical',
    language: 'zh',
    hideModeSwitch: true,
    usageStatistics: false,
    toolbarItems: [
      'heading',
      'bolb',
      'itelic',
      'strike',
      'divider',
      'ul',
      'ol',
      'task',
      // 'intent',
      // 'outdent',
      'divider',
      'table',
      'image',
      'link',
      'divider',
      'code',
      'codeblock'
    ],
    hooks: {
      addImageBlobHook: (blob, callback) => {
        // 异步原因需要使用promise来执行callback
        imageUpload(blob)
          .then(imageURL => {
            callback(imageURL)
          })
      }
    },
    exts: [{
      name: 'colorSyntax'
    }]
  }, attr))
}
