<script setup lang="ts">
import CIcon from '../icons/cIcon.vue';
import type { Message } from '@/interfaces/caht';
import { computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chats';
import { useConfirmStore } from '@/stores/confirm';

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
const chatStore = useChatStore();
const confirmStore = useConfirmStore();

/**
 * Определяем написано ли сообщение
 * текущим пользователем
 * @return {Boolean}
 */
const isMyMessage = computed((): Boolean => {
    return props.message.user.id === userStore.getUser?.id;
});

/**
 * Метод копирования текста сообщения
 */
const copyMessage = (): void => {
    navigator.clipboard.writeText(props.message.text);
};

/**
 * Метод редактирования сообщения
 */
const editMessage = () => {
    chatStore.setMessageInput(props.message);
};

/**
 * Метод удаления сообщения
 */
const deleteMessage = () => {
    confirmStore.setConfirm({
        title: 'Подтвердите удаление',
        message: 'Подтвердите удаление данного сообщения',
        callback: () => {
            chatStore.deleteMessage(props.message.id);
        },
    });
};
</script>

<template>
    <div class="message__option">
        <c-icon
            name="delete"
            class="option__item"
            v-if="isMyMessage"
            @click.prevent="deleteMessage"
        />
        <c-icon name="copy" class="option__item" @click.prevent="copyMessage" />
        <c-icon
            name="edit"
            class="option__item"
            v-if="isMyMessage"
            @click.prevent="editMessage"
        />
    </div>
</template>

<style lang="scss">
.message__option {
    margin: 0 1rem;
    display: flex;
    align-items: center;
    opacity: 0;
    transition: 0.3s opacity;
}

.option__item {
    flex: none;
    padding: 0.25rem;
    height: 28px;
    width: 28px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s opacity;

    &:hover {
        opacity: 1;
    }
}
</style>
