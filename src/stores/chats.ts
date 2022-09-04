import { defineStore } from 'pinia';
import type { Room } from '@/interfaces/caht';
import type { Message } from '@/interfaces/caht';
import Http from '@/classes/Http';

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
        },
        loadRooms(): void {
            Http.inst.get('chat/rooms/my').then((response) => {
                console.log(response.data);
                this.rooms = response.data.rooms;
            });
        },
        loadMessages(): void {
            Http.inst.get('chat/rooms/my').then((response) => {
                console.log(response.data);
            });
        },
    },
});
