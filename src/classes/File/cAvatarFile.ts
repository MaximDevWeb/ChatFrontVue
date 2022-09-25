import CFile from '@/classes/File/cFile';
import type CValidator from '@/classes/File/Validator/cValidator';
import { CValidatorFactory } from '@/classes/File/Validator/cValidatorFactory';
import { FileType } from '@/interfaces/file';

export default class CAvatarFile extends CFile {
    protected validator: CValidator;

    constructor(file: File) {
        super(file);
        this.validator = CValidatorFactory.create(FileType.AVATAR);
    }
}
