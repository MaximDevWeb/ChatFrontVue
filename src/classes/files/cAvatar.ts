import CFile from '@/classes/files/cFile';
import type { AxiosPromise } from 'axios';
import http from '@/bootstrap/http';

export default class CAvatar extends CFile {
    constructor(file: File) {
        super(file);

        this.validType = ['image'];
        this.validSize = 2000000;
        this.type = 'avatar';
    }

    public upload(): AxiosPromise {
        const data = new FormData();
        data.append('avatar', this.file);

        return http.post('user/avatar', data);
    }
}
