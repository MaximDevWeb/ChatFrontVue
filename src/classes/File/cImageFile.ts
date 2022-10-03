import CFile from '@/classes/File/cFile';
import type CValidator from '@/classes/File/Validator/cValidator';
import { CValidatorFactory } from '@/classes/File/Validator/cValidatorFactory';
import { FileType } from '@/interfaces/file';
import type CUploader from '@/classes/File/Uploader/cUploader';
import { CUploaderFactory } from '@/classes/File/Uploader/cUploaderFactory';

export default class CImageFile extends CFile {
    protected validator: CValidator;
    protected uploader: CUploader;

    constructor(file: File) {
        super(file);
        this.validator = CValidatorFactory.create(FileType.Image);
        this.uploader = CUploaderFactory.create(FileType.Image);
    }
}
