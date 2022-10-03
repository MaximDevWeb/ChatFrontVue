import CValidator from '@/classes/File/Validator/cValidator';

export default class CFileValidator extends CValidator {
    protected type = ['application', 'text', 'model', 'video'];
    protected size = 200000000;
}
