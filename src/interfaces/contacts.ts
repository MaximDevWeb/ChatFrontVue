export interface ContactSearch {
    user_id: number;
    login: string;
    full_name: string;
    avatar: {
        link: string;
    };
}

export interface Contact {
    id: number;
    contact_id: number;
    login: string;
    full_name: string;
    avatar: string;
}
