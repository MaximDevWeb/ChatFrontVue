import CUploader from '@/classes/File/Uploader/cUploader';
import { FileType } from '@/interfaces/file';

export default class CFileUploader extends CUploader {
    protected path = 'messages/files';
    protected type = FileType.File;
}
