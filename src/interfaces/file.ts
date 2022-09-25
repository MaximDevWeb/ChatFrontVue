export interface Validate {
    result: boolean;
    errors?: string;
}

export enum FileType {
    Record = 'RECORD',
    Avatar = 'AVATAR',
}
