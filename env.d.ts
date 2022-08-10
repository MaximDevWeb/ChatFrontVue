/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TITLE_PREFIX: string;
    readonly VITE_API_URL: string;
    readonly VITE_TOKEN_NAME: string;
    readonly VITE_PUSHER_KEY: string;
    readonly VITE_PUSHER_LOG: boolean;
}
