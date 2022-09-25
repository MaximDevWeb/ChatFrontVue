import type { Validate } from '@/interfaces/file';

export default abstract class CValidator {
    protected abstract type: Array<string>;
    protected abstract size: number;

    public validate(file: File): Validate {
        const fileType: string | undefined = file.type.split('/').shift();
        const fileSize: number | undefined = file.size;

        if (!fileType || !this.type.includes(fileType)) {
            return {
                result: false,
                errors: 'Формат файла не поддерживается',
            };
        }

        if (!fileSize || fileSize > this.size) {
            return {
                result: false,
                errors: `Размер файла не более ${this.size / 1000000} mb`,
            };
        }

        return {
            result: true,
        };
    }
}
