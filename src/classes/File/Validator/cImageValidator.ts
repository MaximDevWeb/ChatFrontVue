import CValidator from '@/classes/File/Validator/cValidator';

export default class CImageValidator extends CValidator {
    protected type = ['image'];
    protected size = 10000000;
}
