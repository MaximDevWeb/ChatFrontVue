import type { AxiosInstance } from 'axios';
import axios from 'axios';

export default class Http {
    private static _instance: AxiosInstance;

    private tokenName: string = import.meta.env.VITE_TOKEN_NAME;
    private token: string | null = localStorage.getItem(this.tokenName);

    private constructor() {
        Http._instance = axios.create();
        Http._instance.defaults.baseURL = import.meta.env.VITE_API_URL;
        Http._instance.defaults.headers.common['Authorization'] = this.token
            ? 'Bearer ' + this.token
            : Http._instance.defaults.headers.common['Authorization'];
    }

    public static get inst(): AxiosInstance {
        if (!Http._instance) {
            new Http();
        }

        return Http._instance;
    }
}
