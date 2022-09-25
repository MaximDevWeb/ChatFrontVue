import CUploader from '@/classes/File/Uploader/cUploader';
import { FileType } from '@/interfaces/file';

export default class CRecordUploader extends CUploader {
    protected path = 'messages/audio';
    protected type = FileType.Record;
}
