import { defineStore } from 'pinia';

export const useRecorderStore = defineStore('Recorder', {
    state: () => ({
        hide: true,
        record: null as null | File,
    }),
    getters: {
        isHide: (state) => state.hide,
        getRecord: (state) => state.record,
        getRecordURL: (state) =>
            state.record ? window.URL.createObjectURL(state.record) : '',
    },
    actions: {
        setHide(hide: boolean) {
            this.hide = hide;
        },
        setRecord(record: File | null) {
            this.record = record;
        },
    },
});
