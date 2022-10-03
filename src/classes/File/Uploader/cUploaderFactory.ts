import { FileType } from '@/interfaces/file';
import CRecordUploader from '@/classes/File/Uploader/cRecordUploader';
import type CUploader from '@/classes/File/Uploader/cUploader';
import CImageUploader from '@/classes/File/Uploader/cImageUploader';
import CFileUploader from '@/classes/File/Uploader/cFileUploader';

export class CUploaderFactory {
    public static create(type: FileType): CUploader {
        switch (type) {
            case FileType.Record:
                return new CRecordUploader();
            case FileType.Image:
                return new CImageUploader();
            default:
                return new CFileUploader();
        }
    }
}
