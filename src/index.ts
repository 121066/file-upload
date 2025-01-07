interface UploadCallbacks {
    (files: FileList, status?: boolean, errorType?: 'size' | 'type'): void;
}

interface UploadOptions {
    type?: string[];
    size?: number;
}

export function upload(
    callbacks: UploadCallbacks,
    options?: UploadOptions
): void {
    if (typeof callbacks !== 'function') {
        throw Error('请传入回调函数')
    }

    const { type, size } = options || {}

    const int: HTMLInputElement = document.createElement('input')
    int.setAttribute('id', 'file_btn')
    int.setAttribute('type', 'file')
    int.style.display = 'none'

    document.body.appendChild(int)

    const input = document.getElementById('file_btn') as HTMLInputElement
    input.click()
    input.addEventListener(
        'change',
        function (e: Event) {
            const files = (e.target as HTMLInputElement).files
            if (!files) return

            const fileExt = files[0].name.split('.').pop() || ''

            if (size && files[0].size >= size) {
                return callbacks(files, false, 'size')
            }
            if (type?.length && !type.includes(fileExt)) {
                return callbacks(files, false, 'type')
            }
            return callbacks(files)
        },
        false
    )
    // if (!type && !size) {
    //     input.addEventListener('change', callbacks as EventListener, false)
    // } else {
    //     input.addEventListener(
    //         'change',
    //         function (e: Event) {
    //             const files = (e.target as HTMLInputElement).files
    //             if (!files) return

    //             const fileExt = files[0].name.split('.').pop() || ''

    //             if (size && files[0].size >= size) {
    //                 return callbacks(files, false, 'size')
    //             }
    //             if (type?.length && !type.includes(fileExt)) {
    //                 return callbacks(files, false, 'type')
    //             }
    //             return callbacks(files)
    //         },
    //         false
    //     )
    // }

    // 清理DOM
    setTimeout(() => {
        document.body.removeChild(input)
    }, 0)
}

export function download(fileName: string, data: BlobPart): void {
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const href = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = href
    link.download = decodeURIComponent(fileName)

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(href)
}

export function uploadBase(file: Blob): Promise<string> {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = function (e) {
            if (e.target?.result) {
                resolve(e.target.result as string)
            }
        }
        reader.readAsDataURL(file)
    })
} 