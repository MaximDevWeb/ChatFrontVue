import CFile from '@/classes/files/cFile';

export default class CAvatarGroup extends CFile {
    constructor(file: File) {
        super(file);

        this.validType = ['image'];
        this.validSize = 2000000;
        this.type = 'avatar';
    }
}
