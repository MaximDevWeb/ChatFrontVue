import { defineStore } from 'pinia';
import type { currentChat } from '@/interfaces/caht';
import type { Message } from '@/interfaces/caht';

export const useChatStore = defineStore('chat', {
    state: () => ({
        currentChat: <currentChat | null>null,
        messages: [
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Hello',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3002,
                    login: 'ivan.ivanov',
                    full_name: 'Иван Иванов',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/Yk511jey6Kzldz2cAB0gbXmfwicWBzIgDI4qw2r2.jpg',
                },
                text: 'Hello! How are you?',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Nice!!!',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Good luck!',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Hello',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3002,
                    login: 'ivan.ivanov',
                    full_name: 'Иван Иванов',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/Yk511jey6Kzldz2cAB0gbXmfwicWBzIgDI4qw2r2.jpg',
                },
                text: 'Hello! How are you?',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Nice!!!',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Good luck!',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Hello',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3002,
                    login: 'ivan.ivanov',
                    full_name: 'Иван Иванов',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/Yk511jey6Kzldz2cAB0gbXmfwicWBzIgDI4qw2r2.jpg',
                },
                text: 'Hello! How are you?',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Nice!!!',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Good luck!',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Hello',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3002,
                    login: 'ivan.ivanov',
                    full_name: 'Иван Иванов',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/Yk511jey6Kzldz2cAB0gbXmfwicWBzIgDI4qw2r2.jpg',
                },
                text: 'Hello! How are you?',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Nice!!!',
                created_at: '2022-08-08 11:47:28',
            },
            {
                user: {
                    id: 3001,
                    login: 'makkssimka',
                    full_name: 'Максим Жуоквич',
                    avatar: 'https://hb.bizmrg.com/chat_cloud/avatars/custom/P6KDfQZewuUK4mQtkVT9ps07j5zhBOeCPUbc1dP3.jpg',
                },
                text: 'Good luck!',
                created_at: '2022-08-08 11:47:28',
            },
        ] as Array<Message>,
    }),
    getters: {
        getCurrentChat: (state) => state.currentChat,
        getMessages: (state) => state.messages,
    },
    actions: {
        setCurrentChat(chat: currentChat) {
            this.currentChat = chat;
        },
    },
});
