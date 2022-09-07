import { defineStore } from 'pinia';
import type { Room, dataMessage } from '@/interfaces/caht';
import type { Message } from '@/interfaces/caht';
import Http from '@/classes/Http';
import { useToastStore } from '@/stores/toast';
import { useConfirmStore } from '@/stores/confirm';
import _ from 'lodash';
import { useUserStore } from '@/stores/user';
import type { AxiosPromise } from 'axios';

const toastStore = useToastStore();
const confirmStore = useConfirmStore();

export const useChatStore = defineStore('chat', {
    state: () => ({
        room: <Room | null>null,
        rooms: [] as Array<Room>,
        messages: [] as Array<Message>,
        messageInput: {
            id: 0,
            text: '',
        },
    }),
    getters: {
        getRoom: (state) => state.room,
        getRooms: (state) => state.rooms,
        getMessages: (state) => state.messages,
        getMessageInput: (state) => state.messageInput,
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
        setMessageInput(message: Message) {
            this.messageInput.text = message.text;
            this.messageInput.id = message.id;
        },
        cleanMessageInput() {
            this.messageInput.text = '';
            this.messageInput.id = 0;
        },
        addMessage(message: Message) {
            this.messages.push(message);
        },
        updateMessage(message: Message) {
            const found: Message | undefined = this.messages.find((item) => {
                return item.id === message.id;
            });

            if (found) {
                found.text = message.text;
            }
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

            let request: AxiosPromise;

            if (message.id !== 0) {
                request = Http.inst.put(
                    `chat/room/${this.room.id}/messages/${message.id}`,
                    message
                );
            } else {
                request = Http.inst.post(
                    `chat/room/${this.room.id}/messages`,
                    message
                );
            }

            request
                .then(() => {
                    this.cleanMessageInput();
                })
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
