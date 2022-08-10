import Pusher from 'pusher-js';

export default class PusherSocket {
    private static _instance: Pusher;

    private constructor() {
        Pusher.logToConsole = import.meta.env.VITE_PUSHER_LOG;
        PusherSocket._instance = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: 'eu',
        });
    }

    public static get inst(): Pusher {
        if (!PusherSocket._instance) {
            new PusherSocket();
        }

        return PusherSocket._instance;
    }
}
