<script setup lang="ts">
/**
 * Компонент для отображения
 * списка сообщений
 */

import { useChatStore } from '@/stores/chats';
import { computed, onMounted, ref, watch } from 'vue';
import type { Message } from '@/interfaces/caht';
import CMessageItem from '@/components/ui/cMessageItem.vue';
import CPreloader from '@/components/ui/cPreloader.vue';
import PusherSocket from '@/classes/PusherSocket';
import type { MessageData } from '@/interfaces/pusher';

/**
 * Загрузка состояний
 */
const chatStore = useChatStore();

/**
 * Элемент для хака прокрутки вниз
 */
const bottomScroll = ref<null | HTMLDivElement>(null);

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
 * Следим за обновлением сообщений
 * и прокручиваем вниз при появлении
 * новых
 */
watch(messages, async () => {
    if (bottomScroll.value) {
        bottomScroll.value.scrollIntoView();
    }
});

/**
 * Следим за ид текущего чата и оперативно
 * меняем его в Pusher при изменении
 */
watch(roomId, async () => {
    channel.bind('messages.created.' + roomId.value, (data: MessageData) => {
        chatStore.addMessage(data.message);
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
});
</script>

<template>
    <div class="messages__list my-4 pr-4">
        <perfect-scrollbar class="messages__wrap" v-if="messages.length">
            <c-message-item
                v-for="message in messages"
                :key="message.id"
                :message="message"
            />
        </perfect-scrollbar>

        <c-preloader v-else />

        <div ref="bottomScroll" class="bottom__scroll"></div>
    </div>
</template>

<style lang="scss">
.messages__list {
    height: 100%;
    overflow: auto;
}

.messages__wrap {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 100%;
}

.bottom__scroll {
    height: 1px;
    opacity: 0;
    overflow: hidden;

    &:before {
        content: 'scroll';
    }
}
</style>
