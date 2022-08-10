import { defineStore } from 'pinia';
import type { Profile, User } from '@/interfaces/auth';
import Http from '@/classes/Http';

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
            Http.inst.defaults.headers.common['Authorization'] =
                'Bearer ' + token;
        },
        setUser(user: User | null): void {
            this.user = user;
        },
        setProfile(profile: Profile): void {
            if (this.user) {
                this.user.profile = profile;
            }
        },
        setAvatarLink(link: string): void {
            if (this.user) {
                this.user.avatar.link = link;
            }
        },
        isAuth(): boolean {
            return !!localStorage.getItem(this.tokenName);
        },
    },
});
