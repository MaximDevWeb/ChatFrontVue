import type CValidator from '@/classes/File/Validator/cValidator';
import CRecordValidator from '@/classes/File/Validator/cRecordValidator';
import CAvatarValidator from '@/classes/File/Validator/cAvatarValidator';
import CImageValidator from '@/classes/File/Validator/cImageValidator';
import { FileType } from '@/interfaces/file';
import CFileValidator from '@/classes/File/Validator/cFileValidator';

export class CValidatorFactory {
    public static create(type: FileType): CValidator {
        switch (type) {
            case FileType.Record:
                return new CRecordValidator();
            case FileType.Avatar:
                return new CAvatarValidator();
            case FileType.Image:
                return new CImageValidator();
            default:
                return new CFileValidator();
        }
    }
}
