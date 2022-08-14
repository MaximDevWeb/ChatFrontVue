import { defineStore } from 'pinia';
import Http from '@/classes/Http';
import { useToastStore } from '@/stores/toast';
import { useConfirmStore } from '@/stores/confirm';
import _ from 'lodash';
import type { Contact} from '@/interfaces/contacts';

const toastStore = useToastStore();
const confirmStore = useConfirmStore();

export const useContactsStore = defineStore({
    id: 'contacts',
    state: () => ({
        contacts: [] as Array<Contact>,
    }),
    getters: {
        getContacts: (state) => state.contacts,
    },
    actions: {
        loadContacts() {
            Http.inst
                .get('chat/contacts')
                .then((response) => {
                    this.contacts = response.data.contacts;
                })
                .catch(() => {
                    toastStore.addToast({
                        title: 'Ошибка загрузки',
                        message: 'Что-то пошло не так, повторите попытку позже',
                        type: 'danger',
                    });
                });
        },
        deleteContact(contact: Contact) {
            Http.inst
                .delete('chat/contacts/' + contact.id)
                .then(() => {
                    _.remove(
                        this.contacts,
                        (item: any) => item.id === contact.id
                    );

                    toastStore.addToast({
                        title: 'Успешно',
                        message: 'Контакт удален',
                    });
                })
                .catch((errors) => {
                    toastStore.addToast({
                        title: 'Ошибка удаления',
                        message: errors.response.data.errors.delete.shift(),
                        type: 'danger',
                    });
                })
                .then(() => {
                    confirmStore.cleanConfirm();
                });
        },
    },
});
