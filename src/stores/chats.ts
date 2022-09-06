import { defineStore } from 'pinia';
import type { Room, dataMessage } from '@/interfaces/caht';
import type { Message } from '@/interfaces/caht';
import Http from '@/classes/Http';
import { useToastStore } from '@/stores/toast';

const toastStore = useToastStore();

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
        sendMessage(message: dataMessage) {
            if (this.room) {
                return Http.inst
                    .post(`chat/room/${this.room.id}/messages`, message)
                    .catch(() => {
                        toastStore.addToast({
                            title: 'Ошибка отправки',
                            message: 'Сообщение не отправлено',
                            type: 'danger',
                        });
                    });
            }
        },
    },
});
