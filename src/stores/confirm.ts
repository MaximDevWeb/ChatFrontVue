import { defineStore } from 'pinia';
import type { Confirm } from '@/interfaces/confirm';

export const useConfirmStore = defineStore({
    id: 'confirm',
    state: () => ({
        confirm: <Confirm | null>null,
    }),
    getters: {
        getConfirm: (state) => state.confirm,
    },
    actions: {
        setConfirm(confirm: Confirm) {
            this.confirm = confirm;
        },
        cleanConfirm() {
            this.confirm = null;
        },
    },
});
