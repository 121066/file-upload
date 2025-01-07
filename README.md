# db-file

一个轻量级的文件上传下载工具库，支持文件上传、下载和 Base64 转换功能。

## 特性

- 📦 支持多种模块格式 (UMD/CommonJS/ESM)
- 🔑 TypeScript 支持，带有完整的类型定义
- 🚀 支持文件类型和大小限制
- 💫 支持文件转 Base64
- 🎯 零依赖
- 📱 支持主流浏览器

## 安装

```bash
npm install db-file
# 或
yarn add db-file
```

## 使用方法

### 模块引入

```javascript
// ES Module
import { upload, download, uploadBase } from "db-file"

// CommonJS
const { upload, download, uploadBase } = require("db-file")

// UMD (浏览器)
;<script src="path/to/node_modules/db-file/dist/index.umd.js"></script>
```

### 文件上传

```javascript
// 基础用法
upload((files) => {
  console.log("上传的文件:", files[0])
})

// 带文件类型和大小限制
upload(
  (files, status, errorType) => {
    if (errorType === "size") {
      console.log("文件大小超出限制")
      return
    }
    if (errorType === "type") {
      console.log("文件类型不支持")
      return
    }
    console.log("上传成功:", files[0])
  },
  {
    type: ["jpg", "png", "pdf"], // 允许的文件类型
    size: 5 * 1024 * 1024, // 文件大小限制（5MB）
  }
)
```

### 文件下载

```javascript
// 下载文本文件
download('example.txt', 'Hello World');

// 下载二进制数据
const binaryData = new Uint8Array([...]);
download('example.bin', binaryData);
```

### 文件转 Base64

```javascript
// 异步转换文件为 Base64
uploadBase(file).then((base64) => {
  console.log("文件的 Base64 编码:", base64)
})
```

## API 文档

### upload(callback, options?)

文件上传函数

#### 参数

- `callback: (files: FileList, status?: boolean, errorType?: 'size' | 'type') => void`

  - `files`: 上传的文件列表
  - `status`: 上传状态
  - `errorType`: 错误类型（'size' 或 'type'）

- `options?: object`
  - `type?: string[]`: 允许的文件类型数组
  - `size?: number`: 最大文件大小（字节）

### download(fileName: string, data: BlobPart)

文件下载函数

#### 参数

- `fileName`: 下载文件的名称
- `data`: 要下载的数据

### uploadBase(file: Blob): Promise<string>

文件转 Base64 函数

#### 参数

- `file`: 要转换的文件对象

#### 返回值

- `Promise<string>`: 返回文件的 Base64 编码字符串

## 在框架中使用

### Vue 示例

```javascript
import { upload } from "db-file"

export default {
  methods: {
    handleUpload() {
      upload(
        (files, status, errorType) => {
          if (errorType) {
            console.log("错误类型:", errorType)
            return
          }
          console.log("上传的文件:", files[0])
        },
        {
          type: ["jpg", "png"],
          size: 1024 * 1024 * 2, // 2MB
        }
      )
    },
  },
}
```

### React 示例

```javascript
import { upload } from "db-file"

function MyComponent() {
  const handleUpload = () => {
    upload(
      (files, status, errorType) => {
        if (errorType) {
          console.log("错误类型:", errorType)
          return
        }
        console.log("上传的文件:", files[0])
      },
      {
        type: ["jpg", "png"],
        size: 1024 * 1024 * 2, // 2MB
      }
    )
  }

  return <button onClick={handleUpload}>上传文件</button>
}
```

## 浏览器兼容性

- Chrome >= 49
- Firefox >= 45
- Safari >= 10
- Edge >= 14
- IE >= 11

## 许可证

ISC

## 作者

am1210660

## 仓库

[GitHub](https://github.com/am1210660/db-file)
