import axios from 'axios';

const tokenName: string = import.meta.env.VITE_TOKEN_NAME;
const token: string | null = localStorage.getItem(tokenName);

const http = axios.create();

http.defaults.baseURL = import.meta.env.VITE_API_URL;
http.defaults.headers.common['Authorization'] = token
    ? 'Bearer ' + token
    : http.defaults.headers.common['Authorization'];

export default http;
