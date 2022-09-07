<script setup lang="ts">
/**
 * Компонент вывода одного сообщения
 */
import type { Message } from '@/interfaces/caht';
import { computed, onMounted } from 'vue';
import { DateTime } from 'luxon';
import { useUserStore } from '@/stores/user';
import CMessageItemInfo from '@/components/ui/cMessageItemInfo.vue';
import CMessageItemOption from '@/components/ui/CMessageItemOption.vue';

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
 * Вычисляем время сообщения
 * @return {String}
 */
const time = computed((): string => {
    const date = DateTime.fromJSDate(new Date(props.message.created_at));
    return date.toLocaleString(DateTime.TIME_SIMPLE);
});

/**
 * Вычисляем класс для расположения сообщений
 * свои - справа, чужие - слева
 * @return {String} 'message__item_left' | 'message__item_right'
 */
const messageClass = computed((): string => {
    return props.message.user.id === userStore.getUser?.id
        ? 'message__item_left'
        : 'message__item_right';
});

/**
 * Прокрутка списка в конец чата
 */
onMounted((): void => {
    const item = document.querySelectorAll('.message__item');
    item[item.length - 1].scrollIntoView();
});
</script>

<template>
    <div class="message__item mb-4" :class="[messageClass]">
        <c-message-item-info :user="message.user" v-if="message.prev_current" />

        <c-message-item-option :message="message" />

        <div class="message__time text-sm">
            {{ time }}
        </div>

        <div
            class="message__text py-2 px-4 rounded-3xl"
            :class="{ message__text_round: message.prev_current }"
        >
            {{ message.text }}
        </div>
    </div>
</template>

<style lang="scss">
@use '../src/assets/styles/variable';

.message__item {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 0 calc(40px + 0.5rem);

    &:hover {
        .message__option {
            opacity: 1;
        }
    }
}

.message__time {
    color: variable.$black-white;
}

.message__text {
    color: white;
}

.message__item_left {
    .message__time {
        margin-right: 0.5rem;
    }

    .message__text {
        background-color: variable.$blue;
    }

    .message__text_round {
        border-radius: 1.5rem 0 1.5rem 1.5rem;
    }
}

.message__item_right {
    flex-direction: row-reverse;

    .message__time {
        margin-left: 0.5rem;
    }

    .message__text {
        background-color: variable.$light-gray;
    }

    .message__text_round {
        border-radius: 0 1.5rem 1.5rem 1.5rem;
    }
}
</style>
