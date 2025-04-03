declare module 'spark-md5' {
    interface SparkMD5Instance {
        append(arr: ArrayBuffer): void;
        end(): string;
    }

    interface SparkMD5Constructor {
        new(): SparkMD5Instance;
    }

    class SparkMD5 {
        constructor();
        append(str: string): SparkMD5;
        end(): string;
        static hash(str: string): string;
        static hashBinary(content: string): string;
        static ArrayBuffer(): SparkMD5Constructor;
    }

    export default SparkMD5;
} 