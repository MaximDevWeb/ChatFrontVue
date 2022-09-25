import type { Contact } from '@/interfaces/contacts';
import type { FileType } from '@/interfaces/file';

export enum typeChat {
    GROUP = 'group',
    PERSONAL = 'personal',
}

export interface Room {
    id: number;
    name: string;
    avatar: string;
    type: typeChat;
    created_at: string;
    participants: [Contact];
}

export interface Message {
    id: number;
    user: {
        id: number;
        full_name: string;
        avatar: string;
    };
    text: string;
    created_at: string;
    prev_current?: boolean;
}

export interface dataMessage {
    id?: number;
    type?: FileType;
    user_id: number;
    room_id: number;
    text?: string;
    file_id?: number;
}

export interface Timer {
    minutes: number;
    seconds: number;
    milliseconds: number;
}
