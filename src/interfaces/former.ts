export interface FormChatGroup {
    avatar: File | null;
    name: string;
    participants: Array<number>;
}

export interface FormCheckBoxMulti {
    value: any;
    checked: boolean;
}
