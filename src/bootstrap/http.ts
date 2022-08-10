import axios from 'axios';
import PusherSocket from '@/classes/PusherSocket';

const tokenName: string = import.meta.env.VITE_TOKEN_NAME;
const token: string | null = localStorage.getItem(tokenName);
const pusher = PusherSocket.get();

const http = axios.create();

http.defaults.baseURL = import.meta.env.VITE_API_URL;
http.defaults.headers.common['Authorization'] = token
    ? 'Bearer ' + token
    : http.defaults.headers.common['Authorization'];

pusher.connection.bind('connected', () => {
    http.defaults.headers.common['X-Socket-ID'] = pusher.connection.socket_id;
});

export default http;
