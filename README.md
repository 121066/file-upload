# db-file

一个轻量级的文件上传下载工具库，支持文件上传、下载、Base64 转换以及大文件分片上传功能。

## 特性

- 📦 支持多种模块格式 (UMD/CommonJS/ESM)
- 🔑 TypeScript 支持，带有完整的类型定义
- 🚀 支持文件类型和大小限制
- 💫 支持文件转 Base64
- 📏 支持大文件分片上传
- 🔒 支持文件 MD5 校验
- 🎯 支持并发控制
- 📱 支持主流浏览器

## 安装

```bash
npm install db-file
# 或
yarn add db-file
```

## 使用方法

### 基础功能

```javascript
// ES Module
import { upload, download, uploadBase, cutFile } from "db-file"

// CommonJS
const { upload, download, uploadBase, cutFile } = require("db-file")

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

### 大文件分片上传

```javascript
import { cutFile } from "db-file"

async function handleLargeFile(file) {
  try {
    // 获取文件分片
    const chunks = await cutFile(file, 1024 * 1024 * 10) // 设置10MB的分片大小

    // chunks 是一个 Promise 数组，每个 Promise 解析为一个分片数据
    const chunkData = await Promise.all(chunks)

    // 处理每个分片
    for (const chunk of chunkData) {
      console.log("分片信息:", {
        index: chunk.index, // 分片索引
        start: chunk.start, // 起始位置
        end: chunk.end, // 结束位置
        size: chunk.end - chunk.start, // 分片大小
        hash: chunk.hash, // 分片 MD5 哈希值
        blob: chunk.blob, // 分片数据
      })

      // 这里可以发送分片到服务器
      // await uploadChunk(chunk);
    }
  } catch (error) {
    console.error("分片处理失败:", error)
  }
}

// 使用示例
const file = new File(["large content"], "large-file.txt")
handleLargeFile(file)
```

### 分片上传配置说明

- 分片大小：可自定义，默认 20MB
- 自动获取 CPU 核心数进行并发处理
- 自动计算最优分片数量
- 支持文件 MD5 校验，保证文件完整性

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

### cutFile(file: File, chunkSize?: number): Promise<Promise<ChunkData>[]>

大文件分片处理函数

#### 参数

- `file: File` - 要处理的文件
- `chunkSize?: number` - 分片大小（字节），默认 20MB

#### 返回值

- `Promise<Promise<ChunkData>[]>` - 返回分片数据数组的 Promise

#### ChunkData 接口

```typescript
interface ChunkData {
  start: number // 分片起始位置
  end: number // 分片结束位置
  index: number // 分片索引
  hash: string // 分片哈希值
  blob: Blob // 分片数据
}
```

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
import { upload, cutFile } from "db-file"

export default {
  methods: {
    // 普通上传
    handleUpload() {
      upload(
        (files) => {
          console.log("上传的文件:", files[0])
        },
        {
          type: ["jpg", "png"],
          size: 2 * 1024 * 1024, // 2MB
        }
      )
    },

    // 大文件分片上传
    async handleLargeUpload(file) {
      const chunks = await cutFile(file)
      const chunkData = await Promise.all(chunks)

      // 处理分片上传
      for (const chunk of chunkData) {
        await this.uploadChunk(chunk)
      }
    },
  },
}
```

### React 示例

```javascript
import { upload, cutFile } from "db-file"

function MyComponent() {
  const handleUpload = () => {
    upload(
      (files) => {
        console.log("上传的文件:", files[0])
      },
      {
        type: ["jpg", "png"],
        size: 2 * 1024 * 1024, // 2MB
      }
    )
  }

  const handleLargeUpload = async (file) => {
    const chunks = await cutFile(file)
    const chunkData = await Promise.all(chunks)

    // 处理分片上传
    for (const chunk of chunkData) {
      await uploadChunk(chunk)
    }
  }

  return (
    <div>
      <button onClick={handleUpload}>普通上传</button>
      <input
        type="file"
        onChange={(e) => handleLargeUpload(e.target.files[0])}
      />
    </div>
  )
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
