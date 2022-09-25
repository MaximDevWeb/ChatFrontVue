import type CValidator from '@/classes/File/Validator/cValidator';
import CRecordValidator from '@/classes/File/Validator/cRecordValidator';
import CAvatarValidator from '@/classes/File/Validator/cAvatarValidator';
import { FileType } from '@/interfaces/file';

export class CValidatorFactory {
    public static create(type: FileType): CValidator {
        switch (type) {
            case FileType.Record:
                return new CRecordValidator();
            case FileType.Avatar:
                return new CAvatarValidator();
            default:
                return new CAvatarValidator();
        }
    }
}
