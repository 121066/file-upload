import { createChunk, cutFile } from './filesplit';
/** 上传回调函数接口 */
interface UploadCallbacks {
    (files: FileList, status?: boolean, errorType?: 'size' | 'type'): void;
}

/** 上传选项接口 */
interface UploadOptions {
    /** 允许的文件类型数组 */
    type?: string[];
    /** 最大文件大小（字节） */
    size?: number;
}

/**
 * 文件上传函数
 * @param callbacks - 上传回调函数
 * @param options - 上传选项
 * @throws {Error} 当未传入回调函数时抛出错误
 */
export function upload(
    callbacks: UploadCallbacks,
    options?: UploadOptions
): void {
    if (typeof callbacks !== 'function') {
        throw Error('请传入回调函数');
    }

    const { type, size } = options || {};

    const int: HTMLInputElement = document.createElement('input');
    int.setAttribute('id', 'file_btn');
    int.setAttribute('type', 'file');
    int.style.display = 'none';

    document.body.appendChild(int);

    const input = document.getElementById('file_btn') as HTMLInputElement;
    input.click();

    input.addEventListener(
        'change',
        function (e: Event) {
            const files = (e.target as HTMLInputElement).files;
            if (!files) return;

            const fileExt = files[0].name.split('.').pop() || '';

            if (size && files[0].size >= size) {
                return callbacks(files, false, 'size');
            }
            if (type?.length && !type.includes(fileExt)) {
                return callbacks(files, false, 'type');
            }
            return callbacks(files);
        },
        false
    );

    // 清理DOM
    setTimeout(() => {
        document.body.removeChild(input);
    }, 0);
}

/**
 * 文件下载函数
 * @param fileName - 下载文件的名称
 * @param data - 要下载的数据
 */
export function download(fileName: string, data: BlobPart): void {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const href = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = href;
    link.download = decodeURIComponent(fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(href);
}

/**
 * 文件转Base64函数
 * @param file - 要转换的文件
 * @returns Promise<string> Base64编码的字符串
 */
export function uploadBase(file: Blob): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            if (e.target?.result) {
                resolve(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
    });
}

// 导出文件分片相关函数
export { createChunk, cutFile }; 