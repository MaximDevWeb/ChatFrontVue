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
