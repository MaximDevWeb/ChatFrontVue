import { defineStore } from 'pinia';

export const useRecorderStore = defineStore('Recorder', {
    state: () => ({
        hide: true,
        record: '',
    }),
    getters: {
        isHide: (state) => state.hide,
        getRecord: (state) => state.record,
    },
    actions: {
        setHide(hide: boolean) {
            this.hide = hide;
        },
        setRecord(record: string) {
            this.record = record;
        },
    },
});
