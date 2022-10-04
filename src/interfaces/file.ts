export interface Validate {
    result: boolean;
    errors?: string;
}

export enum FileType {
    Record = 'RECORD',
    Avatar = 'AVATAR',
    Image = 'IMAGE',
    File = 'FILE',
    Text = 'TEXT',
}

export interface FileMessage {
    id: number;
    original_name: string;
    extension: string;
    preview: string;
    link: string;
}
