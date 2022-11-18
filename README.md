## file-upload

使用原生 js 实现的文件上传目前没有加文件类型和大小判断,后期会不定时更新
适用于 vue&react 等前端框架
Files uploaded using native js are not judged by file type and size at present, and will be updated irregularly later

Applicable to front-end frameworks such as vue&read

## 使用方法 usage method

vue 中

```
import {upload} from 'db-file'
```

upload 需要传入一个方法来接收上传的 file 对象 Upload needs to pass in a method to receive the uploaded file object

## 提供 api

```
upload(callback,type,size)

callback 回调函数 Callback function

type 文件类型 例:['txt','png'] Example of file type: ['txt ',' png ']

size 文件大小 例: 1024或1024*100 传数字 Example of file size: 1024 or 1024 * 100 for digital transmission

downLoad(fileName,data) 下载文件流 Download file stream

fileName 文件名称 Document name

data 文件流

```

```例如:

调用
upload(back)

function back(e,success,type) {

console.log(e.target.files)//文件

type 校验不通过类型 size||type

success 布尔值 false

}
```

## html 中

引入 file.js 文件
调用方法同上

<p align="center">

  <img src="https://dbyxs.xyz:3006/uploads/21ed635034fe1f350aa92e14bc63e287" width="100%" alt="组件效果图">
</p>
