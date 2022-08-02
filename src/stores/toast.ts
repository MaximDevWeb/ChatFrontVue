import { defineStore } from 'pinia';
import Random from '@/classes/Random';
import * as _ from 'lodash';
import type { Toast } from '@/interfaces/toast';

export const useToastStore = defineStore('toast', {
    state: () => ({
        toasts: [] as Array<Toast>,
    }),
    getters: {
        getToasts: (state) => state.toasts,
    },
    actions: {
        addToast(toast: Toast) {
            toast.key = Random.generateString();
            toast.type = toast.type ?? 'success';
            this.toasts.unshift(toast);
        },
        removeToast(key: string) {
            _.remove(this.toasts, (item) => item.key === key);
        },
    },
});
