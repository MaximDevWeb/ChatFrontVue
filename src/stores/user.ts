import { defineStore } from 'pinia';
import type { User } from '@/interfaces/auth';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: <User | null>null,
        tokenName: <string>import.meta.env.VITE_TOKEN_NAME,
    }),
    getters: {
        getUser: (state) => state.user,
    },
    actions: {
        setToken(token: string): void {
            localStorage.setItem(this.tokenName, token);
        },
        setUser(user: User | null): void {
            this.user = user;
        },
        isAuth(): boolean {
            return !!localStorage.getItem(this.tokenName);
        },
        setAvatarLink(link: string): void {
            if (this.user) {
                this.user.avatar.link = link;
            }
        },
    },
});
