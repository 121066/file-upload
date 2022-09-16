function upload(callbacks) {
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
  input.addEventListener('change', callbacks, false)
  input?.removeEventListener('change', () => console.log('a'))
  const v = input.outerHTML
  input.outerHTML = v
}
export default upload
