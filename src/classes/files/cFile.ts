import type { AxiosPromise } from 'axios';
import Http from '@/classes/Http';

export default class CFile {
    protected validType: Array<string> = ['image', 'application'];
    protected validSize: number = 50000000;
    protected type: string = 'file';

    constructor(protected file: File) {}

    public validate() {
        const fileType: string | undefined = this.file.type.split('/').shift();
        const fileSize: number | undefined = this.file.size;

        if (!fileType || !this.validType.includes(fileType)) {
            return {
                result: false,
                message: 'Формат файла не поддерживается',
            };
        }

        if (!fileSize || fileSize > this.validSize) {
            return {
                result: false,
                message: `Размер файла не более ${this.validSize / 1000000} mb`,
            };
        }

        return {
            result: true,
            message: '',
        };
    }

    public upload(): AxiosPromise {
        const data = {
            avatar: this.file,
        };

        return Http.inst.post('user/avatar', data);
    }
}
