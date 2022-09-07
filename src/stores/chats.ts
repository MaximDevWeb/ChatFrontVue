import { defineStore } from 'pinia';
import type { Room, dataMessage } from '@/interfaces/caht';
import type { Message } from '@/interfaces/caht';
import Http from '@/classes/Http';
import { useToastStore } from '@/stores/toast';
import { useConfirmStore } from '@/stores/confirm';
import _ from 'lodash';

const toastStore = useToastStore();
const confirmStore = useConfirmStore();

export const useChatStore = defineStore('chat', {
    state: () => ({
        room: <Room | null>null,
        rooms: [] as Array<Room>,
        messages: [] as Array<Message>,
    }),
    getters: {
        getRoom: (state) => state.room,
        getRooms: (state) => state.rooms,
        getMessages: (state) => state.messages,
    },
    actions: {
        setRoom(room: Room): void {
            this.room = room;
            this.loadMessages();
        },
        loadRooms(): void {
            Http.inst.get('chat/rooms/my').then((response) => {
                this.rooms = response.data.rooms;
            });
        },
        loadMessages(): void {
            if (this.room) {
                Http.inst
                    .get(`/chat/room/${this.room.id}/messages`)
                    .then((response) => {
                        this.messages = response.data.messages;
                    })
                    .catch(() => {
                        toastStore.addToast({
                            title: 'Ошибка загрузки',
                            message: 'Это не ваш чат',
                            type: 'danger',
                        });
                    });
            }
        },
        addMessage(message: Message) {
            this.messages.push(message);
        },
        removeMessage(id: number) {
            _.remove(this.messages, (item) => {
                return item.id === id;
            });
        },
        deleteMessage(id: number) {
            if (!this.room) return;

            Http.inst
                .delete(`/chat/room/${this.room.id}/messages/${id}`)
                .catch(() => {
                    toastStore.addToast({
                        title: 'Ошибка удаления',
                        message:
                            'Произошла ошибка при удалении, возможно это не Ваше сообщение',
                        type: 'danger',
                    });
                })
                .then(() => {
                    confirmStore.cleanConfirm();
                });
        },
        sendMessage(message: dataMessage) {
            if (!this.room) return;

            return Http.inst
                .post(`chat/room/${this.room.id}/messages`, message)
                .catch(() => {
                    toastStore.addToast({
                        title: 'Ошибка отправки',
                        message: 'Сообщение не отправлено',
                        type: 'danger',
                    });
                });
        },
    },
});
