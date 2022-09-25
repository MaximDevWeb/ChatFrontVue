import CValidator from '@/classes/File/Validator/cValidator';

export default class CAvatarValidator extends CValidator {
    protected type = ['image'];
    protected size = 2000000;
}
