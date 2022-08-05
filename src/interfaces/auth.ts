export interface Form {
    login: string;
    password: string;
}

export interface FormLogin extends Form {
    remember: boolean;
}

export interface FormRegister extends Form {
    password_confirmation: string;
    email: string;
    submit: boolean;
}

export interface Errors {
    login?: Array<string>;
    password?: Array<string>;
    password_confirmation?: Array<string>;
    email?: Array<string>;
    submit?: Array<string>;
}

export interface User {
    id: number;
    login: string;
    email: string;
    created_at: string;
    avatar: Avatar;
    profile: Profile;
}

export interface Avatar {
    id: number;
    type: number;
    path: string;
    link: string;
}

export interface Profile {
    id: number;
    first_name: string;
    last_name: string;
    birthday: string;
    city: string;
}
