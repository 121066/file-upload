## file-upload

使用原生 js 实现的文件上传目前没有加文件类型和大小判断,后期会不定时更新

## 使用方法

vue 中
import upload from 'db-file'

upload 需要传入一个方法来接收上传的 file 对象

```例如:
function back(e) {
console.log(e.target.files)
}
```

## upload(back)

## html 中

引入 file.js 文件
调用方法同上
