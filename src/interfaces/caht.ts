import type { Contact } from '@/interfaces/contacts';

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
    id: number;
    user_id: number;
    room_id: number;
    text: string;
}
