export function upload(callbacks, type, size) {
  if (typeof callbacks !== 'function') {
    throw Error('请传入回调函数')
  }
  let int = document.createElement('input')
  int.setAttribute('id', 'file_btn')
  int.setAttribute('type', 'file')
  int.style = 'display:none;'
  let box = document.querySelector('.box')
  box.appendChild(int)
  const input = document.getElementById('file_btn')
  input.removeEventListener('change', (e) => console.log('a'))
  input.click()
  if (!type && !size) {
    input.addEventListener('change', callbacks, false)
  } else {
    input.addEventListener(
      'change',
      function (e) {
        const files = e.target.files
        const types =
          files[0].name.split('.')[files[0].name.split('.').length - 1]
        if (size && files[0].size >= size) {
          return callbacks(e, false, 'size')
        }
        if (type.length > 0 && !type.includes(types)) {
          return callbacks(e, false, 'type')
        } else {
          return callbacks(e)
        }
      },
      false
    )
  }
  input.removeEventListener('change', () => console.log('a'))
  const v = input.outerHTML
  input.outerHTML = v
}

export function downLoad(fileName, data) {
  const filename = fileName
  const blob = new Blob([data], { type: 'application/octet-stream' })
  const href = window.URL.createObjectURL(blob)
  // 兼容 ie
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = href
  link.download = decodeURIComponent(filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(link)
}
