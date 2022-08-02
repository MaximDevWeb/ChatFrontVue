export interface Form {
    login: string;
    password: string;
    password_confirmation?: string;
    email?: string;
    submit?: boolean;
    remember?: boolean;
}

export interface Errors {
    login?: Array<string>;
    password?: Array<string>;
    password_confirmation?: Array<string>;
    email?: Array<string>;
    submit?: Array<string>;
}
