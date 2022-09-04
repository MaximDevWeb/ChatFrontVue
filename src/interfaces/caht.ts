export enum typeChat {
    GROUP = 'group',
    PERSONAL = 'personal',
}

export interface Room {
    id: number;
    name: string;
    avatar: string;
    type: typeChat;
}

export interface Message {
    user: {
        id: number;
        login: string;
        full_name: string;
        avatar: string;
    };
    text: string;
    created_at: string;
    showUser?: boolean;
}
