import CValidator from '@/classes/File/Validator/cValidator';

export default class CRecordValidator extends CValidator {
    protected type = ['audio'];
    protected size = 100000000;
}
