<script setup lang="ts">
/**
 * Компонент для отображения
 * списка сообщений
 */

import { useChatStore } from '@/stores/chats';
import { computed, onMounted, watch } from 'vue';
import type { Message } from '@/interfaces/caht';
import PusherSocket from '@/classes/PusherSocket';
import type { MessageData, MessageId } from '@/interfaces/pusher';
import CMessage from '@/components/ui/cMessage.vue';
import { DateTime } from 'luxon';
import type { FileType } from '@/interfaces/file';

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
const messages = computed((): Array<Message> => {
    const messages: Array<Message> = chatStore.getMessages;
    let currentId: Number = 0;
    let currentDate: DateTime | null = null;

    messages.map((item: Message) => {
        item.prev_current = currentId !== item.user.id;
        currentId = item.user.id;

        const date = DateTime.fromISO(item.created_at).startOf('day');
        item.prev_date = date.toMillis() !== currentDate?.toMillis();
        currentDate = date;

        return item;
    });

    return messages;
});

/**
 * Фильтруем сообщения по типу
 */
const filteredMessage = computed((): Array<Message> => {
    const filters = chatStore.getFilters;

    if (filters.length) {
        return messages.value.filter((message: Message) => {
            return filters.includes(message.type as FileType);
        });
    } else {
        return messages.value;
    }
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
    channel.unbind('messages.updated.' + oldRoomId);

    channel.bind('messages.created.' + newRoomId, (data: MessageData) => {
        chatStore.addMessage(data.message);
    });
    channel.bind('messages.deleted.' + roomId.value, (data: MessageId) => {
        chatStore.removeMessage(data.id);
    });
    channel.bind('messages.updated.' + roomId.value, (data: MessageData) => {
        chatStore.updateMessage(data.message);
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
    channel.bind('messages.updated.' + roomId.value, (data: MessageData) => {
        chatStore.updateMessage(data.message);
    });
});
</script>

<template>
    <perfect-scrollbar
        class="messages__list my-2 pr-4"
        v-if="filteredMessage.length"
    >
        <div class="messages__wrap">
            <c-message
                v-for="message in filteredMessage"
                :key="message.id"
                :message="message"
            />
        </div>
    </perfect-scrollbar>

    <div class="messages__list_empty my-2 pr-4" v-else>
        <p class="uppercase">У Вас нет сообщений</p>
        <p class="opacity-60">Отправьте сообщение, чтобы начать чат</p>
    </div>
</template>

<style lang="scss">
.messages__list,
.messages__list_empty {
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

.messages__list_empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
