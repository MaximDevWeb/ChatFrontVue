<script setup lang="ts">
/**
 * Компонент для отображения
 * списка сообщений
 */

import { useChatStore } from '@/stores/chats';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import type { Message } from '@/interfaces/caht';
import CMessageItem from '@/components/ui/cMessageItem.vue';
import CPreloader from '@/components/ui/cPreloader.vue';
import PusherSocket from '@/classes/PusherSocket';
import type { MessageData, MessageId } from '@/interfaces/pusher';

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();

/**
 * Создаем канал для прослушивания
 * изменний в сообщениях
 */
const channel = PusherSocket.inst.subscribe('messages');

/**
 * Получаем список сообщений чата
 * и добавляем новое свойство prev_current
 * которое определяет выводить информацию
 * о пользователе или нет
 */
const messages = computed(() => {
    const messages: Array<Message> = chatStore.getMessages;
    let currentId: Number = 0;

    messages.map((item: Message) => {
        item.prev_current = currentId !== item.user.id;
        currentId = item.user.id;
        return item;
    });

    return messages as Array<Message>;
});

/**
 * Вычисляем ид текущего чата
 */
const roomId = computed(() => {
    return chatStore.getRoom?.id;
});

/**
 * Следим за ид текущего чата и оперативно
 * меняем его в Pusher при изменении
 */
watch(roomId, async (newRoomId, oldRoomId) => {
    channel.unbind('messages.created.' + oldRoomId);
    channel.unbind('messages.deleted.' + oldRoomId);

    channel.bind('messages.created.' + newRoomId, (data: MessageData) => {
        chatStore.addMessage(data.message);
    });
    channel.bind('messages.deleted.' + roomId.value, (data: MessageId) => {
        chatStore.removeMessage(data.id);
    });
});

/**
 * Подписываемся на изменения в канале
 * Pusher для текущего чата
 */
onMounted(() => {
    channel.bind('messages.created.' + roomId.value, (data: MessageData) => {
        chatStore.addMessage(data.message);
    });
    channel.bind('messages.deleted.' + roomId.value, (data: MessageId) => {
        chatStore.removeMessage(data.id);
    });
});
</script>

<template>
    <perfect-scrollbar class="messages__list my-2 pr-4">
        <div class="messages__wrap" v-if="messages.length">
            <c-message-item
                v-for="message in messages"
                :key="message.id"
                :message="message"
            />
        </div>

        <c-preloader v-else />
    </perfect-scrollbar>
</template>

<style lang="scss">
.messages__list {
    position: relative;
    height: 100%;
    overflow: auto;

    &:before,
    &:after {
        content: '';
        position: sticky;
        display: block;
        height: 20px;
        z-index: 10;
    }

    &:before {
        top: 0;
        background: linear-gradient(
            180deg,
            rgba(22, 23, 25, 1) 0%,
            rgba(0, 212, 255, 0) 100%
        );
    }

    &:after {
        bottom: 0;
        background: linear-gradient(
            0deg,
            rgba(22, 23, 25, 1) 0%,
            rgba(0, 212, 255, 0) 100%
        );
    }
}

.messages__wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: calc(100% - 40px);
}
</style>
