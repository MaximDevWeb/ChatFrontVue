import Http from '@/classes/Http';

export default abstract class CUploader {
    protected abstract path: string;
    protected abstract type: string;

    public upload(file: File) {
        const data = new FormData();

        data.append('path', this.path);
        data.append('type', this.type);
        data.append('file', file);

        return Http.inst.post('chat/files', data);
    }
}
