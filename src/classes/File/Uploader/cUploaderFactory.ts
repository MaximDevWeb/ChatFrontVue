import { FileType } from '@/interfaces/file';
import CRecordUploader from '@/classes/File/Uploader/cRecordUploader';
import type CUploader from '@/classes/File/Uploader/cUploader';

export class CUploaderFactory {
    public static create(type: FileType): CUploader {
        switch (type) {
            case FileType.Record:
                return new CRecordUploader();
            default:
                return new CRecordUploader();
        }
    }
}
