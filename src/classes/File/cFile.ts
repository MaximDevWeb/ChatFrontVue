import type CValidator from '@/classes/File/Validator/cValidator';
import type { Validate } from '@/interfaces/file';
import type CUploader from '@/classes/File/Uploader/cUploader';
import type { AxiosPromise } from 'axios';

export default abstract class CFile {
    protected abstract validator: CValidator;
    protected abstract uploader: CUploader;

    constructor(protected file: File) {}

    get(): File {
        return this.file;
    }

    validate(): Validate {
        return this.validator.validate(this.file);
    }

    upload(): AxiosPromise {
        return this.uploader.upload(this.file);
    }
}
