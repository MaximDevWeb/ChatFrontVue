<script setup lang="ts">
/**
 * Компонент родитель вывода одного сообщения
 */

import type { Message } from '@/interfaces/caht';
import { computed, defineAsyncComponent } from 'vue';
import { useUserStore } from '@/stores/user';
import CMessageInfo from '@/components/ui/cMessageInfo.vue';
import CMessageTime from '@/components/ui/cMessageTime.vue';
import CMessageDate from '@/components/ui/cMessageDate.vue';

/**
 * Пареметры компонента
 * @param {Message} message - данные чата
 */
const props = defineProps<{
    message: Message;
}>();

/**
 * Загрузка состояний
 */
const userStore = useUserStore();

/**
 * Импортируем компонента
 * исходя из его типа
 */
const MessageComponent = defineAsyncComponent(() => {
    const name =
        props.message.type.charAt(0) +
        props.message.type.slice(1).toLowerCase();

    return import(`@/components/ui/c${name}Message.vue`);
});

/**
 * Вычисляем переменную для расположения сообщений
 * свои - справа, чужие - слева
 * @return {Boolean}
 */
const my = computed((): boolean => {
    return props.message.user.id === userStore.getUser?.id;
});
</script>

<template>
    <c-message-date :date="message.created_at" v-if="message.prev_date" />
    <div
        class="message__item mb-3"
        :class="[my ? 'message__item_right' : 'message__item_left']"
    >
        <c-message-info
            :user="message.user"
            :my="my"
            v-if="message.prev_current"
        />

        <div
            class="message__wrap"
            :class="[my ? 'message_right' : 'message_left']"
        >
            <c-message-time :time="message.created_at" />
            <div
                class="message py-2 px-2 rounded-3xl"
                :class="{ message_round: message.prev_current }"
            >
                <message-component :message="message" :my="my" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.message__item {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 calc(40px + 0.5rem);
    color: white;
}

.message__item_right {
    flex-direction: row-reverse;
}

.message {
    color: white;
}

.message__wrap {
    display: flex;
    align-items: center;
}

.message_right {
    .message {
        background-color: variable.$blue;
    }

    .message_round {
        border-radius: 1.5rem 0 1.5rem 1.5rem;
    }
}

.message_left {
    flex-direction: row-reverse;

    .message {
        background-color: variable.$light-gray;
    }

    .message_round {
        border-radius: 0 1.5rem 1.5rem 1.5rem;
    }
}
</style>
