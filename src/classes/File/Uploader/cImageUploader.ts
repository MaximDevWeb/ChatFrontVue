import CUploader from '@/classes/File/Uploader/cUploader';
import { FileType } from '@/interfaces/file';

export default class CImageUploader extends CUploader {
    protected path = 'messages/images';
    protected type = FileType.Image;
}
