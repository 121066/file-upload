import SparkMd5 from 'spark-md5'

/** 分片数据接口定义 */
interface ChunkData {
    /** 分片起始位置 */
    start: number;
    /** 分片结束位置 */
    end: number;
    /** 分片索引 */
    index: number;
    /** 分片哈希值 */
    hash: string;
    /** 分片数据 */
    blob: Blob;
}

/** Worker 返回结果类型 */
type WorkerResult = ChunkData[];

/**
 * 创建文件分片
 * @param file - 要分片的文件
 * @param index - 分片索引
 * @param chunkSize - 分片大小
 * @returns Promise<ChunkData> 分片数据
 */
export function createChunk(
    file: File,
    index: number,
    chunkSize: number
): Promise<ChunkData> {
    return new Promise((resolve) => {
        const start = index * chunkSize;
        const end = start + chunkSize;
        const fileReader = new FileReader();
        const blob = file.slice(start, end);

        fileReader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result as ArrayBuffer;
            // 直接使用 SparkMD5.ArrayBuffer 的静态方法
            // const sparkMD5 = SparkMd5.ArrayBuffer();
            // const spark = new sparkMD5();
            // const spark = new SparkMd5.ArrayBuffer()
            const spark = new (SparkMd5.ArrayBuffer as any)()
            spark.append(result);
            const hash = spark.end();

            resolve({
                start,
                end,
                index,
                hash,
                blob,
            });
        };
        fileReader.readAsArrayBuffer(blob);
    });
}

/**
 * 文件分片处理
 * @param file - 要处理的文件
 * @param chunkSize - 分片大小（字节），默认20MB
 * @returns Promise<ChunkData[]> 分片数据数组
 */
export async function cutFile(
    file: File,
    chunkSize: number = 1024 * 1024 * 20 // 默认20MB
): Promise<Promise<ChunkData>[]> {
    return new Promise((resolve) => {
        // 获取CPU核心数，默认为4
        const THREAD_COUNT = navigator.hardwareConcurrency || 4;
        // 计算分片总数
        const chunkCount = Math.ceil(file.size / chunkSize);
        const result: Promise<ChunkData>[] = [];

        // 创建所有分片
        for (let i = 0; i < chunkCount; i++) {
            const prom = createChunk(file, i, chunkSize);
            result[i] = prom;
        }

        resolve(result);
    });
}
