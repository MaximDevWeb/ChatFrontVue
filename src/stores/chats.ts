import { defineStore } from 'pinia';
import type { currentChat } from '@/interfaces/caht';
import type { Message } from '@/interfaces/caht';

export const useChatStore = defineStore('chat', {
    state: () => ({
        currentChat: <currentChat | null>null,
        messages: [] as Array<Message>,
    }),
    getters: {
        getCurrentChat: (state) => state.currentChat,
        getMessages: (state) => state.messages,
    },
    actions: {
        setCurrentChat(chat: currentChat): void {
            this.currentChat = chat;
        },
        loadMessages(): void {
            console.log(this.currentChat);
        },
    },
});
